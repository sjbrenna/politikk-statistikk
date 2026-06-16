"use server";

import { prisma } from "@/prisma/prisma";
import {
  fetchCurrentParties,
  fetchCurrentRepresentatives,
} from "./stortingetFetches";
import { Representative } from "./types/representative";

//fetch current parties, compare differences and update db
export const syncParties = async () => {
  try {
    const apiParties = await fetchCurrentParties();
    await prisma.party.deleteMany();
    await prisma.party.createMany({ data: apiParties, skipDuplicates: true });
  } catch (error) {
    throw new Error("Could not perform syncing of parties");
  }
};

export const syncRepresentatives = async () => {
  try {
    const apiRepresentatives = await fetchCurrentRepresentatives();
    const dbRepresentatives =
      (await prisma.representative.findMany()) as Representative[];
    //Create the ones in api, not in db, update the ones that are common, delete the ones who are in db but not api
    const apiMap = new Map(apiRepresentatives.map((p) => [p.id, p]));
    const dbMap = new Map(dbRepresentatives.map((p) => [p.id, p]));
    const toCreate = apiRepresentatives.filter((p) => !dbMap.has(p.id));
    const toUpdate = apiRepresentatives.filter((p) => dbMap.has(p.id));
    const toDelete = dbRepresentatives.filter((p) => !apiMap.has(p.id));
    await prisma.representative.createMany({ data: toCreate });
    for (const r of apiRepresentatives) {
      await prisma.representative.update({
        where: { id: r.id },
        data: {
          firstName: r.firstName,
          lastName: r.lastName,
          birthday: r.birthday,
          partyId: r.partyId,
        },
      });
    }
    await prisma.representative.deleteMany({
      where: {
        id: {
          in: toDelete.map((r) => r.id),
        },
      },
    });
  } catch (error) {
    throw new Error("Could not perform syncing of representatives");
  }
};
