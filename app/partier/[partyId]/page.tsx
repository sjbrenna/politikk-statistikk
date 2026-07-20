import { getPartyName } from "@/lib/stortinget/parties/partyResources";
import { PartyResourceId } from "@/lib/stortinget/parties/partyResources";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import PartyInfoCard from "@/components/party/PartyInfoCard";
import { prisma } from "@/prisma/prisma";
import PartyPoliticianList from "@/components/party/PartyPoliticianList";
import { Politician } from "@/lib/stortinget/types/politician";

type Props = {
  params: Promise<{ partyId: string }>;
};

async function page({ params }: Props) {
  const { partyId } = await params;
  const partyPoliticians: Politician[] = await prisma.politician.findMany({
    where: {
      partyId: partyId,
      representative: true,
    },
    include: { governmentRole: true },
  });
  return (
    <ContentContainer mode="half">
      <PageTitle title={getPartyName(partyId as PartyResourceId)} />
      <PartyInfoCard
        partyId={partyId as PartyResourceId}
        PoliticianCount={partyPoliticians.length}
      />
      <PartyPoliticianList
        PoliticianList={partyPoliticians}
      ></PartyPoliticianList>
    </ContentContainer>
  );
}

export default page;
