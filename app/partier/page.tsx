import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import PartyLogos from "@/components/PartyLogos";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

//oversikt over alle partier
function Page() {
  return (
    <ContentContainer>
      <PageTitle title="Partier" />
      <Item variant={"outline"} className="w-1/2">
        <ItemContent className="gap-y-6">
          <ItemTitle className="text-2xl">
            Alle partiene representert på Stortinget i dag
          </ItemTitle>
          <PartyLogos />
        </ItemContent>
      </Item>
    </ContentContainer>
  );
}

export default Page;
