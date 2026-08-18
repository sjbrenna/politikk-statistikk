"use client";

import { useContext, useEffect, useState } from "react";
import useDebounce from "@/app/hooks/useDebounce";
import { CasesProviderContext } from "@/app/providers/casesProvider";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PageTitle from "@/components/pageLayout/PageTitle";
import { Input } from "@/components/ui/input";
import OverviewCaseList from "@/components/cases/OverviewCaseList";
import FuncPagination from "@/components/FuncPagination";
import { config } from "@/app/config";
import ContentCard from "@/components/pageLayout/ContentCard";
import SubjectDropdown from "@/components/SubjectDropdown";

type Props = {
  subjects: string[];
};

function CaseOverviewPageClient({ subjects }: Props) {
  const defaultSubject = "Filtrer saker basert på et tema...";
  const subjectsWithDefault = [defaultSubject, ...subjects];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(
    subjectsWithDefault[0],
  );
  const debouncedQuery = useDebounce(searchQuery);
  const [curPage, setCurPage] = useState(1);
  const cases = useContext(CasesProviderContext).cases;

  const filterCases = () => {
    let filteredCases = cases.filter((listCase) =>
      listCase.korttittel.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
    if (selectedSubject !== defaultSubject) {
      filteredCases = filteredCases.filter((listCase) =>
        listCase.emne_liste
          .map((subject) => subject.navn)
          .includes(selectedSubject),
      );
    }

    return filteredCases;
  };

  const filteredCases = filterCases();

  const startIndex = (curPage - 1) * config.caseOverviewPageSize;
  const endIndex = startIndex + config.caseOverviewPageSize;
  const casesToShow = filteredCases.slice(startIndex, endIndex);

  useEffect(() => {
    setCurPage(1);
  }, [debouncedQuery]);

  return (
    <ContentContainer mode="half">
      <PageTitle title={"Sakoversikt"} />
      <ContentCard>
        <div
          className="flex flex-col lg:flex-row 
        flex-wrap gap-2 items-center"
        >
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Søk etter tittel på sak..."
            className="placeholder:text-foreground border 
              border-accent w-full lg:flex-2
          bg-background lg:min-h-10 min-h-10
        "
          />
          <div className="lg:flex-1 w-full">
            {subjects.length !== 0 && (
              <SubjectDropdown
                subjects={subjectsWithDefault}
                content={selectedSubject}
                handleSubjectChange={setSelectedSubject}
              />
            )}
          </div>
        </div>

        <OverviewCaseList propsCases={casesToShow} />
        <FuncPagination
          currentPage={curPage}
          handlePageChange={setCurPage}
          totalCases={filteredCases.length}
          pageSize={config.caseOverviewPageSize}
        />
      </ContentCard>
    </ContentContainer>
  );
}

export default CaseOverviewPageClient;
