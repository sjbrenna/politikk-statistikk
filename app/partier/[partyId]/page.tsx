import { getPartyName } from "@/lib/stortinget/parties/partyResources";
import { PartyResourceId } from "@/lib/stortinget/parties/partyResources";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import ContentCard from "@/components/pageLayout/ContentCard";
import PartyInfoCard from "@/components/party/PartyInfoCard";
import { prisma } from "@/prisma/prisma";
import PartyRepresentativeList from "@/components/party/PartyRepresentativeList";

//Logo, navn, antall representanter

type Props = {
  params: Promise<{ partyId: string }>;
};

async function page({ params }: Props) {
  const { partyId } = await params;
  const partyRepresentatives = await prisma.representative.findMany({
    where: {
      partyId: partyId,
    },
  });
  return (
    <ContentContainer mode="half">
      <PageTitle title={getPartyName(partyId as PartyResourceId)} />
      <PartyInfoCard
        partyId={partyId as PartyResourceId}
        representativeCount={partyRepresentatives.length}
      />
      <PartyRepresentativeList
        representativeList={partyRepresentatives}
      ></PartyRepresentativeList>
    </ContentContainer>
  );
}

export default page;
