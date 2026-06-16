import ContentCard from "@/components/pageLayout/ContentCard";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import PartyLogos from "@/components/PartyLogos";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

//oversikt over alle partier
function Page() {
  return (
    <ContentContainer mode={"half"}>
      <PageTitle title="Partier" />
      <ContentCard>
        <div className="text-3xl w-full text-center font-bold border-b-2">
          Alle partiene representert på Stortinget i dag
        </div>
        <PartyLogos />
      </ContentCard>
    </ContentContainer>
  );
}

export default Page;
