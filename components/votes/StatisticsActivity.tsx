import { VoteRecord } from "@/prisma/generated/client";
import ContentCard from "../pageLayout/ContentCard";

type Props = {
  votes: VoteRecord[];
};

function StatisticsActivity({ votes }: Props) {
  const presenceCount = votes.filter((vote) => vote.vote !== "ABSENT").length;

  console.log(presenceCount);
  return (
    <ContentCard className="flex flex-row gap-x-2 bg-background w-fit">
      {presenceCount !== 0 ? (
        <>
          <strong>Oppmøte:</strong>
          {((presenceCount / votes.length) * 100).toFixed(2)}%
        </>
      ) : (
        <p>Politikeren har ikke stemt i noen saker i denne perioden</p>
      )}
    </ContentCard>
  );
}

export default StatisticsActivity;
