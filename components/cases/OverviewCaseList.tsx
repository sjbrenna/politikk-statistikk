"use client";

import { CasesProviderContext } from "@/app/providers/casesProvider";
import { useContext } from "react";
import CaseCard from "./CaseCard";
import { ApiCase } from "@/lib/stortinget/types/case";

type Props = {
  propsCases?: ApiCase[];
  cutoff?: number;
  renderCase?: (caseItem: ApiCase) => React.ReactNode;
};
function OverviewCaseList({
  propsCases,
  cutoff,
  renderCase = (c) => <CaseCard caseSource={c} key={c.id} />,
}: Props) {
  const cases = useContext(CasesProviderContext);
  const casesToUse = propsCases ?? cases.cases ?? [];
  const renderedCases =
    cutoff !== undefined ? casesToUse.slice(0, cutoff) : casesToUse;
  return (
    <div className="flex flex-col w-full gap-y-2">
      {renderedCases.length !== 0 ? (
        renderedCases.map(renderCase)
      ) : (
        <p>Ingen saker...</p>
      )}
    </div>
  );
}

export default OverviewCaseList;
