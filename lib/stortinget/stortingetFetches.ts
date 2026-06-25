"use server";

import { mapParty } from "./services/mapParties";
import { mapPolitician } from "./services/mapPoliticians";
import { stortingFetch } from "./stortingetClient";
import { ApiGovernmentResponse } from "./types/government";
import { ApiPartyResponse, Party } from "./types/party";
import { ApiPeriodResponse } from "./types/period";
import { ApiPoliticianResponse } from "./types/politician";
import { mapGovernmentRole } from "./services/mapGovernmentRole";

export const fetchCurrentParties = async () => {
  const curYear = new Date().getFullYear();
  const yearParam = `${curYear - 1}-${curYear}`;

  const response = await stortingFetch<ApiPartyResponse>(
    `partier?sesjonid=${yearParam}`,
  );

  return response.partier_liste.map(mapParty);
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

export const fetchGovernmentRoles = async () => {
  const governmentResponse =
    await stortingFetch<ApiGovernmentResponse>("regjering");
  return governmentResponse.regjeringsmedlemmer_liste.map(mapGovernmentRole);
};
