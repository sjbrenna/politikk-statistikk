import { SpringPartyVotes } from "../springApi/springPartyVotes";
import { AppPartyVotes } from "../AppTypes/AppPartyVotes";

export default function mapPartyVotes(
  springPartyVotes: SpringPartyVotes,
): AppPartyVotes {
  return {
    subjectName: springPartyVotes.subjectName,
    subjectId: springPartyVotes.subjectId,
    votes: springPartyVotes.partyVotes.map((vote) => ({
      partyId: vote.partyName,
      votesFor: vote.votesFor,
      votesAgainst: vote.votesAgainst,
    })),
  };
}
