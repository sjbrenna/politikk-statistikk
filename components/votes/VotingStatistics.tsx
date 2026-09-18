import { VoteRecord } from "@/prisma/generated/client";
import ContentCard from "../pageLayout/ContentCard";
import StatisticsActivity from "./StatisticsActivity";

type Props = {
  votes: VoteRecord[];
};

function VotingStatistics({ votes }: Props) {
  return (
    <ContentCard>
      <StatisticsActivity votes={votes} />
    </ContentCard>
  );
}

export default VotingStatistics;
