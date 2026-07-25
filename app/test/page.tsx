//page to run syncing functions manually
"use client";

import { Button } from "@/components/ui/button";
import {
  syncParties,
  syncPoliticians,
} from "@/lib/stortinget/stortingetSyncing";
import { fetchCases, fetchSessions } from "@/lib/stortinget/stortingetFetches";

function page() {
  const handlePartyClick = async () => {
    await syncParties();
  };

  const handleSessionClick = async () => {
    const sessions = await fetchSessions();
    console.log(sessions);
  };
  const handleCasesClick = async () => {
    const cases = await fetchCases();
    console.log(cases);
  };
  const handlePoliticianClick = async () => {
    await syncPoliticians();
  };
  return (
    <div>
      <Button onClick={handlePartyClick}>Sync Parties</Button>
      <Button onClick={handlePoliticianClick}>Sync Politicians</Button>
      <Button onClick={handleSessionClick}>Sessions</Button>
      <Button onClick={handleCasesClick}>Cases</Button>
    </div>
  );
}

export default page;
