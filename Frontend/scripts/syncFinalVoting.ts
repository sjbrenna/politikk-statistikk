import "dotenv/config";

import {
  fetchCases,
  fetchVotingOverview,
} from "@/lib/stortinget/stortingetFetches";
import { prisma } from "@/prisma/prisma";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const BATCH_SIZE = 60;
const DELAY_MS = 1000;
async function syncFinalVotings() {
  try {
    const cases = await fetchCases();

    for (let i = 0; i < cases.length; i += BATCH_SIZE) {
      const batch = cases.slice(i, i + BATCH_SIZE);
      const votingIds: string[] = [];

      for (const apiCase of batch) {
        const overview = await fetchVotingOverview(apiCase.id);
        const votingId = overview.sak_votering_liste?.at(-1)?.votering_id;
        if (votingId !== undefined && votingId !== null) {
          votingIds.push(votingId.toString());
        }
        await sleep(DELAY_MS);
      }

      await prisma.finalVoting.createMany({
        data: votingIds.map((id) => ({ votingID: id })),
        skipDuplicates: true,
      });

      console.log(
        `Saved ${Math.min(i + BATCH_SIZE, cases.length)}/${cases.length}`,
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}
syncFinalVotings().catch((error) => {
  console.error("Sync failed:", error);
  process.exitCode = 1;
});
