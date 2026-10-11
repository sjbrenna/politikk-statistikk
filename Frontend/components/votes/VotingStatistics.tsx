import { Prisma, VoteRecord } from "@/prisma/generated/client";
import ContentCard from "../pageLayout/ContentCard";
import StatisticsActivity from "./StatisticsActivity";
import StatisticsSubjects from "./StatisticsSubjects";

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
  proposalCount: number;
};

function VotingStatistics({ votes, metadata, proposalCount }: Props) {
  return (
    <ContentCard
      header={
        <div className="flex flex-row gap-x-2 items-center">
          <p className="cardTitle">Statistikk:</p>
          <p className="font-light">
            Statistikken er basert på Stortingets åpne data, og gjelder for
            perioden 2025-2026
          </p>
        </div>
      }
    >
      <StatisticsActivity votes={votes} proposalsCount={proposalCount} />
      <StatisticsSubjects votes={votes} metadata={metadata} />
    </ContentCard>
  );
}

export default VotingStatistics;
