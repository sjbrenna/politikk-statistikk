//Function to, given a subjectId, calculate how the parties vote on it
//Returns an object that displays the subject's name, id, period and the parties' votes

import { config } from "@/app/config";
import { Voting } from "@/prisma/generated/enums";
import { prisma } from "@/prisma/prisma";

export type PartyVote = {
  for: number;
  against: number;
};

export type PartyVoting = {
  subjectId: number;
  subjectName: string;
  period: string;
  partyVotes: Map<string, PartyVote>;
};

export async function CalculatePartyVotingOnSubject(subjectId: number) {
  try {
    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      throw new Error("Not valid subjectId!");
    }

    const caseIds = (
      await prisma.caseSubject.findMany({
        where: {
          subjectId: subject.id,
        },
        select: {
          caseMetadataId: true,
        },
      })
    ).map((metadata) => metadata.caseMetadataId);
    const caseIdSet = new Set(caseIds);

    const subjectVotes = await prisma.voteRecord.findMany({
      where: {
        caseID: {
          in: [...caseIdSet],
        },
        vote: {
          not: Voting.ABSENT,
        },
      },
      select: {
        vote: true,
        politician: {
          select: {
            partyId: true,
          },
        },
      },
    });

    const partyVotesMap = new Map<string, PartyVote>();

    for (const subjectVote of subjectVotes) {
      const partyId = subjectVote.politician.partyId;
      const vote = subjectVote.vote;

      if (!partyVotesMap.has(partyId)) {
        partyVotesMap.set(partyId, {
          for: 0,
          against: 0,
        });
      }

      const stats = partyVotesMap.get(partyId)!;

      if (vote === Voting.FOR) {
        stats.for++;
      } else if (vote === Voting.AGAINST) {
        stats.against++;
      }
    }

    const partyVotes = {
      subjectId: subject.id,
      subjectName: subject.name,
      period: config.currentPeriod,
      partyVotes: partyVotesMap,
    };

    return partyVotes;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
