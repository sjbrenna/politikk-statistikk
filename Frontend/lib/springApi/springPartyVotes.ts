export type SpringPartyVotes = {
  period: string;
  subjectId: number;
  subjectName: string;
  partyVotes: SpringPartyVote[];
};

export type SpringPartyVote = {
  partyName: string;
  votesFor: number;
  votesAgainst: number;
};
