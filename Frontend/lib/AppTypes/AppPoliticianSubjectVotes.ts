export type PoliticianSubjectVotesResponse = {
  politicianId: string;
  period: string;
  subjectVotes: AppSubjectVote[];
};

export type AppSubjectVote = {
  subjectId: number;
  subjectName: string;
  votesFor: number;
  votesAgainst: number;
};
