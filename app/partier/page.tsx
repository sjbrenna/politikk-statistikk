import ContentCard from "@/components/pageLayout/ContentCard";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import PartyLogos from "@/components/PartyLogos";

//oversikt over alle partier
//TODO: Replace PartyLogos med en dropdown oversikt på small screen
function Page() {
  return (
    <ContentContainer mode={"half"}>
      <PageTitle title="Partier" />
      <ContentCard
        header={
          <p className="text-2xl w-full text-center font-bold">
            {" "}
            Alle partiene representert på Stortinget i dag
          </p>
        }
      >
        <PartyLogos />
      </ContentCard>
    </ContentContainer>
  );
}

export default Page;
