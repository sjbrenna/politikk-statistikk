import { config } from "@/app/config";
import { Prisma, Subject, VoteRecord } from "@/prisma/generated/client";
import ContentCard from "../pageLayout/ContentCard";
import SubjectVoteRanking from "./SubjectVoteRanking";
type CaseMetadataWithSubjects = Prisma.CaseMetadataGetPayload<{
  include: {
    subjects: {
      include: {
        subject: true;
      };
    };
  };
}>;
type Props = {
  votes: VoteRecord[];
  metadata: CaseMetadataWithSubjects[];
};

function StatisticsSubjects({ votes, metadata }: Props) {
  //Result: need a map where subjects are mapped to count of for and against votes.
  //for each vote, get its associated metadata, then iterate through the subjects, add or increment to the map
  const metadataMap = new Map(
    metadata.map((metadata) => [metadata.id, metadata]),
  );

  const subjectVoteMap = new Map<
    number,
    { subject: Subject; for: number; against: number }
  >();

  for (const vote of votes) {
    const voteMetadata = metadataMap.get(vote.caseID);

    if (!voteMetadata) continue;

    for (const caseSubject of voteMetadata.subjects) {
      const subject = caseSubject.subject;

      let stats = subjectVoteMap.get(subject.id);

      if (!stats) {
        stats = { subject, for: 0, against: 0 };
        subjectVoteMap.set(subject.id, stats);
      }

      if (vote.vote === "FOR") {
        stats.for++;
      } else if (vote.vote === "AGAINST") {
        stats.against++;
      }
    }
  }

  const subjects = [...subjectVoteMap.values()].filter(
    (item) => item.against + item.for >= config.minVotesStatistic,
  );

  //Calculate by percentage, not total votes
  const topAgainst = [...subjects]
    .sort(
      (a, b) =>
        b.against / (b.for + b.against) - a.against / (a.for + a.against),
    )
    .slice(0, config.noOfSubjectsStats);

  const topFor = [...subjects]
    .sort((a, b) => b.for / (b.for + b.against) - a.for / (a.for + a.against))
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
