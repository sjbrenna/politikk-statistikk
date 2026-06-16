"use client";

import { getPartyName } from "@/lib/stortinget/parties/partyResources";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PartyResourceId } from "@/lib/stortinget/parties/partyResources";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import ContentCard from "@/components/pageLayout/ContentCard";

//Logo, navn, antall representanter

function page() {
  const { partyId } = useParams();
  const partyName = getPartyName(partyId as PartyResourceId);
  return (
    <ContentContainer>
      <PageTitle title={partyName} />
      <Image
        src={`/logos/${partyId}.png`}
        alt="error"
        width={48}
        height={48}
      ></Image>
      <ContentCard>TEST</ContentCard>
    </ContentContainer>
  );
}

export default page;
