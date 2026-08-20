"use client";

import { CasesProviderContext } from "@/app/providers/casesProvider";
import { useContext } from "react";
import CaseCard from "./CaseCard";
import { ApiCase } from "@/lib/stortinget/types/case";

type Props = {
  propsCases?: ApiCase[];
  cutoff?: number;
};
function OverviewCaseList({ propsCases, cutoff }: Props) {
  const cases = useContext(CasesProviderContext);
  const casesToUse = propsCases ?? cases.cases ?? null;
  const renderedCases = cutoff ? casesToUse.slice(0, cutoff) : casesToUse;
  return (
    <div className="flex flex-col w-full gap-y-2">
      {renderedCases.length !== 0 ? (
        renderedCases.map((c) => (
          <CaseCard caseSource={c} key={c.id}></CaseCard>
        ))
      ) : (
        <p>Ingen saker...</p>
      )}
    </div>
  );
}

export default OverviewCaseList;
