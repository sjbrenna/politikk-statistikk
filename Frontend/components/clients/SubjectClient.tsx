"use client";

import { Subject, Voting } from "@/prisma/generated/client";
import ContentContainer from "../pageLayout/ContentContainer";
import PageTitle from "../pageLayout/PageTitle";
import { useContext } from "react";
import { CasesProviderContext } from "@/app/providers/casesProvider";
import OverviewCaseList from "../cases/OverviewCaseList";
import PreviewCaseCard from "../cases/PreviewCaseCard";
import { config } from "@/app/config";
import ContentCard from "../pageLayout/ContentCard";
import { PartyVoting } from "@/lib/StatCalculations/SubjectPartyVote";
import PartyVoteStatistics from "../votes/PartyVoteStatistics";

type Props = {
  subject: Subject;
  caseIds: Set<string>;
  partyVotes: PartyVoting;
};

//Siste saker,
//sånn stemmer partiene basert på saker relatert til temaet
//fra prisma finn sakene som har dette som ett av temaene
//Statistikken må aggregeres på prisma for performance messige grunner.

function SubjectClient({ subject, caseIds, partyVotes }: Props) {
  const cases = useContext(CasesProviderContext).cases;
  const subjectCases = cases.filter((item) => caseIds.has(item.id.toString()));

  return (
    <ContentContainer mode="half">
      <PageTitle
        header={
          <div className="flex flex-col gap-y-4">
            <p className="pageTitle self-center ">{subject.name}</p>
          </div>
        }
        children={
          <p>
            Statistikken er basert på alle registrerte stemmer fra politikere
            som representerer partiet i de valgte sakene. Hver votering teller
            separat, også når flere voteringer gjelder samme sak
          </p>
        }
      />

      <PartyVoteStatistics partyVotesProps={partyVotes} />

      <ContentCard>
        <p className="text-accent-foreground pb-2 border-b border-accent mb-2">
          Siste saker angående {subject.name}
        </p>

        <OverviewCaseList
          propsCases={subjectCases}
          cutoff={config.subjectCases}
          renderCase={(item) => (
            <PreviewCaseCard
              key={item.id}
              caseId={item.id}
              shortTitle={item.korttittel}
            />
          )}
        />
      </ContentCard>
    </ContentContainer>
  );
}

export default SubjectClient;
