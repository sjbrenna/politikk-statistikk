import { Voting } from "@/prisma/generated/enums";

export function mapApiVoting(vote: number): Voting {
  switch (vote) {
    case 1:
      return Voting.ABSENT;
    case 2:
      return Voting.FOR;
    case 3:
      return Voting.AGAINST;
    default:
      throw new Error(`Unknown voting value: ${vote}`);
  }
}
