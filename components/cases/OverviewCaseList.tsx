"use client";

import { CasesProviderContext } from "@/app/providers/casesProvider";
import { useContext, useState } from "react";
import CaseCard from "./CaseCard";
import { ApiCase } from "@/lib/stortinget/types/case";

type Props = {
  propsCases?: ApiCase[];
};
function OverviewCaseList({ propsCases }: Props) {
  const cases = useContext(CasesProviderContext);
  const renderedCases = propsCases ?? cases.cases ?? null;
  console.log("CASES: ", renderedCases);
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
