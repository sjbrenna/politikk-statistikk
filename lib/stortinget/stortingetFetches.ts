"use server";

import { mapParty } from "./services/mapParties";
import { mapPolitician } from "./services/mapPoliticians";
import { stortingFetch } from "./stortingetClient";
import { ApiGovernmentResponse } from "./types/government";
import { ApiPartyResponse, Party } from "./types/party";
import { ApiPeriodResponse } from "./types/period";
import { ApiPoliticianResponse } from "./types/politician";
import { mapGovernmentRole } from "./services/mapGovernmentRole";
import { ApiSessionResponse } from "./types/session";
import { mapSessions } from "./services/mapSessions";
import { ApiCaseResponse, ApiDetailedCaseResponse } from "./types/case";
import { mapCases } from "./services/mapCases";
import {
  ApiVotingOverview,
  ApiVotingResult,
  ApiVotingSuggestionOverview,
} from "./types/voting";
import { ApiSubjects } from "./types/subject";

export const fetchCurrentParties = async () => {
  const curYear = new Date().getFullYear();
  const yearParam = `${curYear - 1}-${curYear}`;

  const response = await stortingFetch<ApiPartyResponse>(
    `partier?sesjonid=${yearParam}`,
  );

  return response.partier_liste.map(mapParty);
};

export const fetchSessions = async () => {
  const response = await stortingFetch<ApiSessionResponse>("sesjoner");
  return response.sesjoner_liste.map(mapSessions);
};

export const fetchPeriods = async () => {
  const response = await stortingFetch<ApiPeriodResponse>("stortingsperioder");
  return response.innevaerende_stortingsperiode.id;
};

export const fetchCurrentRepresentatives = async () => {
  const currentPeriod = await fetchPeriods();
  const response = await stortingFetch<ApiPoliticianResponse>(
    `representanter?stortingsperiodeid=${currentPeriod}`,
  );

  return response.representanter_liste.map(mapPolitician);
};

export const fetchCases = async (sessionId?: string) => {
  const sessions = await fetchSessions();
  let sessionParam = "";
  if (sessionId && sessions.includes(sessionId)) {
    sessionParam = "?sesjonid=" + sessionId;
  }
  const response = await stortingFetch<ApiCaseResponse>("saker" + sessionParam);
  return response.saker_liste
    .map(mapCases)
    .sort((a, b) => b.sist_oppdatert_dato.localeCompare(a.sist_oppdatert_dato));
};

export const fetchCase = async (caseId: string) => {
  const response = await stortingFetch<ApiDetailedCaseResponse>(
    "sak?sakid=" + caseId,
  );
  return response;
};

export const fetchGovernmentRoles = async () => {
  const response = await stortingFetch<ApiGovernmentResponse>("regjering");
  return response.regjeringsmedlemmer_liste.map(mapGovernmentRole);
};

export const fetchVotingOverview = async (caseId: string) => {
  const response = await stortingFetch<ApiVotingOverview>(
    "voteringer?sakid=" + caseId,
  );
  return response;
};

export const fetchVotingResult = async (votingId: string) => {
  const response = await stortingFetch<ApiVotingResult>(
    "voteringsvedtak?voteringid=" + votingId,
  );
  return response;
};

export const fetchSubjects = async () => {
  const response = await stortingFetch<ApiSubjects>("emner");
  return response;
};

export const fetchVotingSuggestionOverview = async (votingId: string) => {
  const response = await stortingFetch<ApiVotingSuggestionOverview>(
    "/voteringsforslag?voteringid=" + votingId,
  );
  return response;
};
