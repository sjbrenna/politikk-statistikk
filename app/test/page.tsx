//page to run syncing functions manually
"use client";

import { Button } from "@/components/ui/button";
import {
  syncCaseVote,
  syncCommittees,
  syncParties,
  syncPoliticians,
  syncSubjects,
  syncAllCaseVotes,
  syncCaseMetadata,
  getCaseMetadata,
} from "@/lib/stortinget/stortingetSyncing";
import { fetchCases, fetchSessions } from "@/lib/stortinget/stortingetFetches";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function page() {
  const [caseValue, setCaseValue] = useState("");
  const [caseMetadataValue, setCaseMetadataValue] = useState("");

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

  const handleSubjectsClick = async () => {
    await syncSubjects();
  };

  const handleCommitteesClick = async () => {
    await syncCommittees();
  };

  const handleVotingClick = async () => {
    await syncCaseVote(caseValue);
  };

  const handleAllVotingClick = async () => {
    await syncAllCaseVotes();
  };

  const handleCaseMetadataClick = async () => {
    await syncCaseMetadata();
  };

  const handleGetCaseMetadataClick = async () => {
    await getCaseMetadata(caseMetadataValue);
  };

  return (
    <div>
      <Button onClick={handlePartyClick}>Sync Parties</Button>
      <Button onClick={handlePoliticianClick}>Sync Politicians</Button>
      <Button onClick={handleSessionClick}>Sessions</Button>
      <Button onClick={handleCasesClick}>Cases</Button>
      <Button onClick={handleSubjectsClick}>Subjects</Button>
      <Button onClick={handleCommitteesClick}>Sync Committees</Button>
      <div className="flex flex-col gap-2">
        <Input
          value={caseValue}
          onChange={(e) => setCaseValue(e.target.value)}
          className="w-20"
        />
        <Button onClick={handleVotingClick}>Voting</Button>
      </div>
      <Button onClick={handleAllVotingClick}>Sync All Case Votes</Button>
      <Button onClick={handleCaseMetadataClick}>Sync Case Metadata</Button>
      <div className="flex flex-col gap-2">
        <Input
          value={caseMetadataValue}
          onChange={(e) => setCaseMetadataValue(e.target.value)}
          className="w-20"
          placeholder="Case ID"
        />
        <Button onClick={handleGetCaseMetadataClick}>Get Case Metadata</Button>
      </div>
    </div>
  );
}

export default page;
