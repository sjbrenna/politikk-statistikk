import { VoteRecord } from "@/prisma/generated/client";

type Props = {
  votes: VoteRecord[];
};

function StatisticsSubjects({ votes }: Props) {
  //Map votes to subjects
  return <div></div>;
}

export default StatisticsSubjects;
