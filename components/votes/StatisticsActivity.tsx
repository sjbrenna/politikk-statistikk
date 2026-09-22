import { VoteRecord } from "@/prisma/generated/client";
import ContentCard from "../pageLayout/ContentCard";

type Props = {
  votes: VoteRecord[];
};

function StatisticsActivity({ votes }: Props) {
  const presenceCount = votes.filter((vote) => vote.vote !== "ABSENT").length;

  return (
    <ContentCard className="flex flex-row gap-x-2 bg-background w-fit">
      <strong>Oppmøte:</strong>{" "}
      {((presenceCount / votes.length) * 100).toFixed(2)}%
    </ContentCard>
  );
}

export default StatisticsActivity;
