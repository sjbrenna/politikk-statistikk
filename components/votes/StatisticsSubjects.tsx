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

  const topAgainst = subjects
    .sort((a, b) => b.against - a.against)
    .slice(0, config.noOfSubjectsStats);

  const topFor = subjects
    .sort((a, b) => b.for - a.for)
    .slice(0, config.noOfSubjectsStats);

  return (
    <div className="w-full justify-between flex flex-row gap-x-10">
      <ContentCard
        header={<p className="subCardTitle">Temaer mest for:</p>}
        className="bg-background"
      >
        <SubjectVoteRanking type="for" subjectEntries={topFor} />
      </ContentCard>
      <ContentCard
        className="bg-background"
        header={<p className="subCardTitle">Temaer mest mot:</p>}
      >
        <SubjectVoteRanking type="against" subjectEntries={topAgainst} />
      </ContentCard>
    </div>
  );
}

export default StatisticsSubjects;
