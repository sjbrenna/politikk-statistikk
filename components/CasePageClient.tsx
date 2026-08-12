"use client";
import useDebounce from "@/app/hooks/useDebounce";
import { useContext, useState } from "react";
import SubjectsToggleList from "@/components/SubjectsToggleList";
import { CasesProviderContext } from "@/app/providers/casesProvider";
import CaseBasicList from "./cases/CaseBasicList";
import ContentContainer from "./pageLayout/ContentContainer";
import PageTitle from "./pageLayout/PageTitle";

type Props = {
  subjects: {
    id: number;
    name: string;
    isMainSubject: boolean;
    parentId: number | null;
  }[];
};

//Filtering logic, toggled subjects and search field.
//Lift state up to parent, filter here then pass to list to render.
function CasePageClient({ subjects }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [toggledSubjects, setToggledSubjects] = useState<number[]>([]);
  const debouncedQuery = useDebounce(searchQuery);
  const cases = useContext(CasesProviderContext).cases;

  //Filter based on toggled subjects, a case's subjects should be a superset of the toggled subjects
  const filterSubjects = () => {
    const subjectFilter = cases.filter((listCase) => {
      const subjectIds = listCase.emne_liste.map((emne) => emne.id);
      return toggledSubjects.every((id) => subjectIds.includes(id));
    });
    const searchFilter = subjectFilter.filter((listCase) => {
      listCase.korttittel.includes(debouncedQuery.toLowerCase());
    });
    return searchFilter;
  };

  const filteredCases = filterSubjects();

  return (
    <ContentContainer mode="half">
      <PageTitle title={"Sakoversikt"} />
      <div>
        <SubjectsToggleList
          toggledSubjects={toggledSubjects}
          onSubjectsChange={setToggledSubjects}
        />
        <CaseBasicList />
      </div>
    </ContentContainer>
  );
}

export default CasePageClient;
