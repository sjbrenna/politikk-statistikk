import { VoteRecord } from "@/prisma/generated/client";
import ContentCard from "../pageLayout/ContentCard";

type Props = {
  votes: VoteRecord[];
  proposalsCount: number;
};

function StatisticsActivity({ votes, proposalsCount }: Props) {
  const presenceCount = votes.filter((vote) => vote.vote !== "ABSENT").length;

  return (
    <ContentCard className="flex lg:flex-row flex-col gap-x-2 bg-background w-fit">
      {presenceCount !== 0 ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-x-2">
            <strong>Oppmøte:</strong>
            {((presenceCount / votes.length) * 100).toFixed(2)}%
          </div>
          <div className="flex flex-row gap-x-2">
            <strong>Antall saker lagt frem: </strong>
            {proposalsCount}
          </div>
        </div>
      ) : (
        <p>Politikeren har ikke stemt i noen saker i denne perioden</p>
      )}
    </ContentCard>
  );
}

export default StatisticsActivity;
