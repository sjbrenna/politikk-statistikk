"use client";

import { Calendar, Hash } from "lucide-react";
import ContentContainer from "../pageLayout/ContentContainer";
import PageTitle from "../pageLayout/PageTitle";
import { useContext } from "react";
import { CasesProviderContext } from "@/app/providers/casesProvider";
import { ApiDetailedCaseResponse } from "@/lib/stortinget/types/case";

type Props = {
  sourceCase: ApiDetailedCaseResponse;
};

export default function CasePageClient({ sourceCase }: Props) {
  const cases = useContext(CasesProviderContext).cases;
  const caseDate = cases.find(
    (p) => p.id === sourceCase.id,
  )?.sist_oppdatert_dato;
  console.log(sourceCase);
  return (
    <ContentContainer mode="half">
      <PageTitle title={sourceCase.korttittel}>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row gap-x-2 items-center">
            <Calendar />
            <p className="text-2xl">Sist behandlet: {caseDate}</p>
          </div>
          <div className="flex flex-row gap-x-2 items-center">
            <Hash />
            <p className="text-2xl">ID: {sourceCase.id}</p>
          </div>
          <div className="flex flex-row gap-x-2 items-center">
            <p className="text-2xl">Status: {sourceCase.type}</p>
          </div>
        </div>
      </PageTitle>
    </ContentContainer>
  );
}
