import { config } from "@/app/config";
import ContentCard from "../pageLayout/ContentCard";
import SubjectVoteRanking from "./SubjectVoteRanking";
import {
  AppSubjectVote,
  PoliticianSubjectVotesResponse,
} from "@/lib/AppTypes/AppPoliticianSubjectVotes";

type Props = {
  subjectVotesResponse: PoliticianSubjectVotesResponse;
};

function StatisticsSubjects({ subjectVotesResponse }: Props) {
  const subjectVotes = subjectVotesResponse.subjectVotes;

  const forRatio = (subjectVote: AppSubjectVote) => {
    return (
      subjectVote.votesFor / (subjectVote.votesFor + subjectVote.votesAgainst)
    );
  };

  const againstRatio = (subjectVote: AppSubjectVote) => {
    return (
      subjectVote.votesAgainst /
      (subjectVote.votesFor + subjectVote.votesAgainst)
    );
  };

  const subjects = subjectVotes.filter(
    (item) => item.votesAgainst + item.votesFor >= config.minVotesStatistic,
  );

  const topAgainst = [...subjects]
    .sort((a, b) => againstRatio(b) - againstRatio(a))
    .slice(0, config.noOfSubjectsStats);

  const topFor = [...subjects]
    .sort((a, b) => forRatio(b) - forRatio(a))
    .slice(0, config.noOfSubjectsStats);

  return (
    <div className="w-full flex lg:flex-row flex-col gap-y-2 items-center lg:items-stretch gap-x-10 flex-wrap justify-center">
      <ContentCard
        header={<p className="subCardTitle">Temaer mest for:</p>}
        className="bg-background w-full flex-1"
      >
        <SubjectVoteRanking type="for" subjectEntries={topFor} />
      </ContentCard>
      <ContentCard
        className="bg-background w-full flex-1"
        header={<p className="subCardTitle">Temaer mest mot:</p>}
      >
        <SubjectVoteRanking type="against" subjectEntries={topAgainst} />
      </ContentCard>
    </div>
  );
}

export default StatisticsSubjects;
