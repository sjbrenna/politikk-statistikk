"use server";

import { fetchCurrentParties } from "@/lib/stortinget/stortingetFetches";
import { prisma } from "@/prisma/prisma";

export const fetchTimingTest = async () => {
  const startTime = performance.now();
  await fetchCurrentParties();
  const endTime = performance.now();
  console.log("time to fetch parties: ", endTime - startTime);
  const startTime2 = performance.now();
  await prisma.party.findMany();
  const endTime2 = performance.now();
  console.log("time to prisma: ", endTime2 - startTime2);
};
