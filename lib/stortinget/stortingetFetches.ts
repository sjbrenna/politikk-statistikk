"use server";

import { mapParty } from "./services/mapParties";
import { mapRepresentative } from "./services/mapRepresentatives";
import { stortingFetch } from "./stortingetClient";
import { ApiPartyResponse, Party } from "./types/party";
import { ApiPeriodResponse } from "./types/period";
import { ApiRepresentativeResponse } from "./types/representative";

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
  const response = await stortingFetch<ApiRepresentativeResponse>(
    `representanter?stortingsperiodeid=${currentPeriod}`,
  );
  return response.representanter_liste.map(mapRepresentative);
};
