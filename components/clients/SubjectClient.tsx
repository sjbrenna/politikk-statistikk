"use client";

import { Subject } from "@/prisma/generated/client";
import ContentContainer from "../pageLayout/ContentContainer";
import PageTitle from "../pageLayout/PageTitle";
import { useContext } from "react";
import { CasesProviderContext } from "@/app/providers/casesProvider";

type Props = {
  subject: Subject;
};

//Siste saker,
//sånn stemmer partiene basert på saker relatert til temaet
//fra prisma finn sakene som har dette som ett av temaene
//Statistikken må aggregeres på prisma for performance messige grunner.

function SubjectClient({ subject }: Props) {
  const cases = useContext(CasesProviderContext);
  console.log("CASES:", cases);
  return (
    <ContentContainer mode="half">
      <PageTitle
        header={
          <div className="flex flex-col gap-y-4">
            <p className="pageTitle self-center ">{subject.name}</p>
          </div>
        }
      />
    </ContentContainer>
  );
}

export default SubjectClient;
