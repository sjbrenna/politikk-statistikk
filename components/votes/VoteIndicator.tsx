import { Voting } from "@/prisma/generated/enums";

type Props = {
  vote: Voting;
};
const voteStyles = {
  [Voting.FOR]: {
    label: "For",
    className: "bg-accepted",
  },
  [Voting.AGAINST]: {
    label: "Mot",
    className: "bg-rejected",
  },
  [Voting.ABSENT]: {
    label: "Ikke tilstede",
    className: "bg-absent",
  },
};
function VoteIndicator({ vote }: Props) {
  const { label, className } = voteStyles[vote];

  return <div className={`rounded-md py-1 px-2 ${className}`}>{label}</div>;
}

export default VoteIndicator;
