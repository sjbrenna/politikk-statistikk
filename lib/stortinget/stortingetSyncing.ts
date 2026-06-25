"use server";

import { prisma } from "@/prisma/prisma";
import {
  fetchCurrentParties,
  fetchCurrentPoliticians,
  fetchGovernmentRoles,
} from "./stortingetFetches";
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
    const apiPoliticians = await fetchCurrentRepresentatives();
    const governmentRoles = await fetchGovernmentRoles();

    await prisma.politician.deleteMany();
    //Create each politician
    for (const politician of apiPoliticians) {
      await prisma.politician.create({
        data: {
          id: politician.id,
          firstName: politician.firstName,
          lastName: politician.lastName,
          birthday: politician.birthday,
          partyId: politician.partyId,
        },
      });
    }
    const politicianIds = new Set(apiPoliticians.map((p) => p.id));
    //For each govRole, if one with matching id doesnt exist, create one
    //then create matching govRole
    for (const govRole of governmentRoles) {
      if (!politicianIds.has(govRole.id)) {
        await prisma.politician.create({
          data: {
            id: govRole.id,
            firstName: govRole.fornavn,
            lastName: govRole.etternavn,
            birthday: govRole.foedselsdato,
            partyId: govRole.parti.id,
          },
        });
      }
      await prisma.governmentRole.create({
        data: {
          politicianId: govRole.id,
          department: govRole.departement,
          title: govRole.tittel,
          role: govRole.verv,
        },
      });
    }
    console.log("FINISHED POLITICIANS");
  } catch (error) {
    throw new Error("Could not perform syncing of Politicians: " + error);
  }
};
