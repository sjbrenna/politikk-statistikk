import CaseBasicList from "@/components/cases/CaseBasicList";
import ContentCard from "@/components/pageLayout/ContentCard";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PartyLogos from "@/components/PartyLogos";

export default function Home() {
  return (
    <ContentContainer mode="half">
      <ContentCard
        header={<div className="pl-4">Partier representert på Stortinget</div>}
      >
        <PartyLogos />
      </ContentCard>
      <ContentCard header={<div className="pl-4">Nyeste saker</div>}>
        <CaseBasicList />
      </ContentCard>
    </ContentContainer>
  );
}
