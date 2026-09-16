"use server";

import { prisma } from "@/prisma/prisma";
import {
  fetchCurrentParties,
  fetchAllRepresentatives,
  fetchGovernmentRoles,
  fetchSubjects,
  fetchVotingOverview,
  fetchVotingResult,
  fetchCases,
} from "./stortingetFetches";
import { PrismaVoteRecord } from "./types/voting";
Voting;
import { mapApiVoting } from "./services/mapVoting";
import { ApiCase } from "./types/case";
import { config } from "@/app/config";
import { Voting } from "@/prisma/generated/enums";

//fetch current parties, compare differences and update db
export const syncParties = async () => {
  try {
    const apiParties = await fetchCurrentParties();
    console.log(apiParties);
    await prisma.party.deleteMany();
    await prisma.party.createMany({ data: apiParties, skipDuplicates: true });
  } catch (error) {
    throw new Error("Could not perform syncing of parties");
  }
};

//Retrieves all accessible politicians from the api
export const syncPoliticians = async () => {
  try {
    //Politicians are a set consisting of the representatives, and those in elected government positions who are not representatives.
    //In addition, fetch all vara-representatives
    const apiPoliticians = await fetchAllRepresentatives();
    const governmentRoles = await fetchGovernmentRoles();
    await Promise.all(
      apiPoliticians.map((politician) => {
        const data = {
          firstName: politician.firstName,
          lastName: politician.lastName,
          birthday: politician.birthday,
          partyId: politician.partyId,
          representative: politician.representative,
          vara_representative: politician.vara_representative,
        };

        return prisma.politician.upsert({
          where: {
            id: politician.id,
          },
          create: {
            id: politician.id,
            ...data,
          },
          update: data,
        });
      }),
    );
    const politicianIds = new Set(apiPoliticians.map((p) => p.id));

    await Promise.all(
      governmentRoles.map((govRole) => {
        const data = {
          firstName: govRole.fornavn,
          lastName: govRole.etternavn,
          birthday: govRole.foedselsdato,
          partyId: govRole.parti.id,
          representative: false,
          vara_representative: false,
        };
        return prisma.politician.upsert({
          where: {
            id: govRole.id,
          },
          create: {
            id: govRole.id,
            firstName: govRole.fornavn,
            lastName: govRole.etternavn,
            birthday: govRole.foedselsdato,
            partyId: govRole.parti.id,
            representative: false,
            vara_representative: false,
          },
          update: {
            firstName: govRole.fornavn,
            lastName: govRole.etternavn,
            birthday: govRole.foedselsdato,
            partyId: govRole.parti.id,
            representative: false,
            vara_representative: false,
          },
        });
      }),
    );

    await Promise.all(
      governmentRoles.map((govRole) =>
        prisma.governmentRole.upsert({
          where: {
            politicianId: govRole.id,
          },
          create: {
            politicianId: govRole.id,
            department: govRole.departement,
            title: govRole.tittel,
            role: govRole.verv,
          },
          update: {
            politicianId: govRole.id,
            department: govRole.departement,
            title: govRole.tittel,
            role: govRole.verv,
          },
        }),
      ),
    );
  } catch (error) {
    throw new Error("Could not perform syncing of Politicians: " + error);
  }
};

export const syncSubjects = async () => {
  try {
    const subjects = (await fetchSubjects()).emne_liste;
    await Promise.all(
      subjects.map((subject) =>
        prisma.subject.upsert({
          where: { id: subject.id },
          update: {
            name: subject.navn,
            isMainSubject: subject.er_hovedemne,
            parentId: null,
          },
          create: {
            id: subject.id,
            name: subject.navn,
            isMainSubject: subject.er_hovedemne,
            parentId: null,
          },
        }),
      ),
    );

    await Promise.all(
      subjects.flatMap((subject) =>
        subject.underemne_liste.map((childSubject) =>
          prisma.subject.upsert({
            where: { id: childSubject.id },
            update: {
              name: childSubject.navn,
              isMainSubject: false,
              parentId: subject.id,
            },
            create: {
              id: childSubject.id,
              name: childSubject.navn,
              isMainSubject: false,
              parentId: subject.id,
            },
          }),
        ),
      ),
    );
  } catch (error) {
    throw new Error("Could not perform syncing of subjects: " + error);
  }
};

export const syncCaseVote = async (caseID: string) => {
  const start = performance.now();
  //Fetch the votings for a case
  const votingOverview = (await fetchVotingOverview(caseID)).sak_votering_liste;
  if (votingOverview.length === 0) {
    return;
  }
  console.log("FetchVotingOverview:", performance.now() - start);
  //filter out the unneeded ones, those with -1 for antall_for and antall_mot
  // Stortinget uses -1 for votings without recorded for/mot counts,
  // which we don't want to include in voting statistics.
  const votingIDs = votingOverview
    .filter((apiVote) => apiVote.antall_for !== -1 && apiVote.antall_mot !== -1)
    .map((apiVote) => apiVote.votering_id);
  if (votingIDs.length === 0) {
    return;
  } else {
    const afterOverview = performance.now();
    //for each votingID, extract the relevant information
    const politicianVotes: PrismaVoteRecord[] = (
      await Promise.all(
        votingIDs.map((votingID) => fetchVotingResult(votingID)),
      )
    ).flatMap((voteResult) =>
      voteResult.voteringsresultat_liste.map((polVoteResult) => ({
        polID: polVoteResult.representant.id,
        vote: mapApiVoting(polVoteResult.votering),
        caseID,
        voteID: voteResult.votering_id,
      })),
    );
    console.log("Get results: ", performance.now() - afterOverview);
    const afterResults = performance.now();
    await prisma.voteRecord.createMany({
      data: politicianVotes.map((voteRecord) => ({
        politicianID: voteRecord.polID,
        vote: voteRecord.vote,
        caseID: voteRecord.caseID.toString(),
        votingID: voteRecord.voteID.toString(),
      })),
      skipDuplicates: true,
    });
    console.log("creation: ", performance.now() - afterResults);
  }
};

export const syncAllCaseVotes = async () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const cases: ApiCase[] = await fetchCases();
  const start = performance.now();
  for (let i = 0; i < cases.length; i += config.caseSyncConcurrently) {
    const curCases = cases.slice(i, i + config.caseSyncConcurrently);
    await Promise.allSettled(
      curCases.map((apiCase) => syncCaseVote(apiCase.id)),
    );
    await sleep(4000);
  }
  console.log("All cases vote sync votes: ", performance.now() - start);
};

export const syncVotings = async () => {};
