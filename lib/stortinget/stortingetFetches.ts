"use server";

import { mapParty } from "./services/mapParties";
import { stortingFetch } from "./stortingetClient";
import { ApiPartyResponse, Party } from "./types/party";

export const fetchCurrentParties = async () => {
  const curYear = new Date().getFullYear();
  const yearParam = `${curYear - 1}-${curYear}`;

  const response = await stortingFetch<ApiPartyResponse>(
    `partier?sesjonid=${yearParam}`,
  );

  return response.partier_liste.map(mapParty);
};
