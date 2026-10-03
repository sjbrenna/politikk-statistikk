"use server";

import { mapParty } from "./services/mapParties";
import { mapPolitician } from "./services/mapPoliticians";
import { stortingFetch } from "./stortingetClient";
import { ApiGovernmentResponse } from "./types/government";
import { ApiPartyResponse, Party } from "./types/party";
import { ApiPeriodResponse } from "./types/period";
import {
  ApiCurrentPoliticianResponse,
  ApiPoliticianResponse,
} from "./types/politician";
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
import { ApiCommitteeResponse } from "./types/committee";
import { config } from "@/app/config";

export const fetchParties = async () => {
  const periods = await fetchPeriods();

  const currentPeriod = periods.innevaerende_stortingsperiode.id;
  const previousPeriod = periods.stortingsperioder_liste[1].id;

  const [currentResponse, previousResponse] = await Promise.all([
    stortingFetch<ApiPartyResponse>(
      `partier?stortingsperiodeid=${currentPeriod}`,
    ),
    stortingFetch<ApiPartyResponse>(
      `partier?stortingsperiodeid=${previousPeriod}`,
    ),
  ]);

  const parties = [
    ...previousResponse.partier_liste,
    ...currentResponse.partier_liste,
  ];

  const uniqueParties = [
    ...new Map(parties.map((party) => [party.id, party])).values(),
  ];

  return uniqueParties.map(mapParty);
};
export const fetchCurrentParties = async () => {
  const response = await stortingFetch<ApiPartyResponse>(
    `partier?stortingsperiodeid=${config.currentPeriod}`,
  );

  return response.partier_liste.map(mapParty);
};

export const fetchSessions = async () => {
  const response = await stortingFetch<ApiSessionResponse>("sesjoner");
  return response.sesjoner_liste.map(mapSessions);
};

export const fetchPeriods = async () => {
  const response = await stortingFetch<ApiPeriodResponse>("stortingsperioder");
  return response;
};

export const fetchCurrentRepresentatives = async () => {
  const response = await stortingFetch<ApiCurrentPoliticianResponse>(
    "/dagensrepresentanter",
  );
  return response.dagensrepresentanter_liste;
};

export const fetchAllRepresentatives = async () => {
  const responses = (
    await Promise.all(
      config.politicianPeriods.map((period) =>
        stortingFetch<ApiPoliticianResponse>(
          `representanter?stortingsperiodeid=${period}&vararepresentanter=true`,
        ),
      ),
    )
  ).flatMap((response) => response.representanter_liste);
  return responses.map(mapPolitician);
};

export const fetchCases = async () => {
  const response = await Promise.all(
    config.currentSessions.map((session) =>
      stortingFetch<ApiCaseResponse>(`saker?sesjonid=${session}`),
    ),
  );

  const cases = response.flatMap((casesList) => casesList.saker_liste);

  return cases
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

export const fetchVotingResult = async (votingID: string) => {
  const response = await stortingFetch<ApiVotingResult>(
    "voteringsresultat?voteringid=" + votingID,
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

export const fetchCommittees = async () => {
  const response = await Promise.all(
    config.currentSessions.map((session) =>
      stortingFetch<ApiCommitteeResponse>(`/komiteer?sesjonid=${session}`),
    ),
  );
  const committees = response.flatMap((committee) => committee.komiteer_liste);
  return committees;
};
