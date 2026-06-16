"use client";

import { getPartyName } from "@/lib/stortinget/parties/partyResources";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PartyResourceId } from "@/lib/stortinget/parties/partyResources";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import ContentCard from "@/components/pageLayout/ContentCard";
import PartyInfoCard from "@/components/party/PartyInfoCard";

//Logo, navn, antall representanter

function page() {
  const { partyId } = useParams();
  const partyName = getPartyName(partyId as PartyResourceId);
  return (
    <ContentContainer>
      <PageTitle title={partyName} />
      <PartyInfoCard partyId={partyId as PartyResourceId}></PartyInfoCard>
    </ContentContainer>
  );
}

export default page;
