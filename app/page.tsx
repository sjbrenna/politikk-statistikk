import OverviewCaseList from "@/components/cases/OverviewCaseList";
import ContentCard from "@/components/pageLayout/ContentCard";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PartyLogos from "@/components/PartyLogos";

export default function Home() {
  return (
    <ContentContainer mode="half">
      <ContentCard
        header={
          <div className="pl-4 wrap-break-word">
            Partier representert på Stortinget
          </div>
        }
      >
        <PartyLogos />
      </ContentCard>
      <ContentCard
        header={<div className="pl-4 wrap-break-word">Nyeste saker</div>}
      >
        <OverviewCaseList />
      </ContentCard>
    </ContentContainer>
  );
}
