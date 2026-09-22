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
};

function VotingStatistics({ votes, metadata }: Props) {
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
      <StatisticsActivity votes={votes} />
      <StatisticsSubjects votes={votes} metadata={metadata} />
    </ContentCard>
  );
}

export default VotingStatistics;
