import CaseBasicList from "@/components/cases/CaseBasicList";
import ContentContainer from "@/components/pageLayout/ContentContainer";

export default function Home() {
  return (
    <ContentContainer mode="half">
      <CaseBasicList></CaseBasicList>
    </ContentContainer>
  );
}
