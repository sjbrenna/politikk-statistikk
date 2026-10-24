export const config = {
  homepageCases: 10,
  pageSize: 20,
  subjectCases: 10,
  caseSyncConcurrently: 1,
  noOfSubjectsStats: 3,
  minVotesStatistic: 10,
  currentPeriod: "2025-2029",
  currentSessions: ["2025-2026", "2026-2027"],
  politicianPeriods: ["2021-2025", "2025-2029"],
  springApiBaseUrl: "https://politikk-statistikk-production.up.railway.app",
  localDevBackendUrl: "http://localhost:8080",
  politicianSubjectVotesURL:
    "/api/politician-votes/get-politician-votes-for-subject/",
};
