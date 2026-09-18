import { VoteRecord } from "@/prisma/generated/client";

type Props = {
  votes: VoteRecord[];
};

function StatisticsActivity({ votes }: Props) {
  const presenceCount = votes.filter((vote) => vote.vote !== "ABSENT").length;

  return (
    <div>
      {presenceCount}
      <p>{votes.length}</p>
    </div>
  );
}

export default StatisticsActivity;
