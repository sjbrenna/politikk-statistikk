import { Voting } from "@/prisma/generated/enums";

export function mapApiVoting(vote: number): Voting {
  switch (vote) {
    case 1:
      return Voting.ABSTAINED;
    case 2:
      return Voting.YES;
    case 3:
      return Voting.NO;
    default:
      throw new Error(`Unknown voting value: ${vote}`);
  }
}
