"use client";
//Basic overview page, basic information for each case of the latest cases, cutoff at a given number with a link for total list

import { CasesProviderContext } from "@/app/providers/casesProvider";
import { useContext, useState } from "react";
import CaseCard from "./CaseCard";
import { ApiCase } from "@/lib/stortinget/types/case";

type Props = {
  propsCases?: ApiCase[];
  pageSettings?: { paginated: boolean; casesPerPage: number };
};
//If paginated render pages and cutoff
function CaseBasicList({ propsCases, pageSettings }: Props) {
  const cases = useContext(CasesProviderContext);
  const [curPage, setCurPage] = useState(1);
  const renderedCases = propsCases ?? cases.cases ?? null;
  const pageCases = pageSettings && renderedCases.slice();
  //slice renderedCases based on curpage
  return (
    <div className="flex flex-col m-2 p-2 w-full gap-y-2">
      {renderedCases ? (
        renderedCases.map((c) => (
          <CaseCard caseSource={c} key={c.id}></CaseCard>
        ))
      ) : (
        <p>Ingen saker...</p>
      )}
    </div>
  );
}

export default CaseBasicList;
