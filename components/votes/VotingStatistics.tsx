import { VoteRecord } from "@/prisma/generated/client";
import ContentCard from "../pageLayout/ContentCard";
import StatisticsPresence from "./StatisticsPresence";

type Props = {
  votes: VoteRecord[];
};

function VotingStatistics({ votes }: Props) {
  return (
    <ContentCard>
      <StatisticsPresence votes={votes} />
    </ContentCard>
  );
}

export default VotingStatistics;
