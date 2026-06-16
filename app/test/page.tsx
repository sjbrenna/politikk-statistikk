//Testpage to compare fetch to prisma find
"use client";

import { Button } from "@/components/ui/button";
import {
  syncParties,
  syncRepresentatives,
} from "@/lib/stortinget/stortingetSyncing";
import { fetchTimingTest } from "../server-actions/tests";
import { fetchCurrentRepresentatives } from "@/lib/stortinget/stortingetFetches";

function page() {
  const handlePrismaClick = async () => {
    await syncParties();
  };
  const handleFetchClick = async () => {
    await fetchTimingTest();
  };

  const handleRepresentativeClick = async () => {
    await syncRepresentatives();
  };
  return (
    <div>
      <Button onClick={handlePrismaClick}>Test Prisma</Button>
      <Button onClick={handleFetchClick}>Test fetch</Button>
      <Button onClick={handleRepresentativeClick}>Representatives</Button>
    </div>
  );
}

export default page;
