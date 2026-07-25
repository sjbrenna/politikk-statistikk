"use client";
//Basic overview page, basic information for each case of the latest cases, cutoff at a given number with a link for total list

import { CasesProviderContext } from "@/app/providers/casesProvider";
import { useContext } from "react";
import CaseCard from "./CaseCard";

function CaseBasicList() {
  const cases = useContext(CasesProviderContext);

  return (
    <div className="flex flex-col m-2 p-2 w-full gap-y-2">
      {cases ? (
        cases.cases.map((c) => <CaseCard caseSource={c} key={c.id}></CaseCard>)
      ) : (
        <p>Ingen saker...</p>
      )}
    </div>
  );
}

export default CaseBasicList;
