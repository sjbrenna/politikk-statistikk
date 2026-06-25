//page to run syncing functions manually
"use client";

import { Button } from "@/components/ui/button";
import {
  syncParties,
  syncPoliticians,
} from "@/lib/stortinget/stortingetSyncing";

function page() {
  const handlePartyClick = async () => {
    await syncParties();
  };
  const handlePoliticianClick = async () => {
    await syncPoliticians();
  };
  return (
    <div>
      <Button onClick={handlePartyClick}>Sync Parties</Button>
      <Button onClick={handlePoliticianClick}>Sync Politicians</Button>
    </div>
  );
}

export default page;
