export type AppPartyVotes = {
  subjectName: string;
  subjectId: number;
  votes: AppPartyVote[];
};

export type AppPartyVote = {
  partyId: string;
  votesFor: number;
  votesAgainst: number;
};
