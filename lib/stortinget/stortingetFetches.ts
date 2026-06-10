"use server";

import { stortingFetch } from "./stortingetClient";
import { Party } from "./types/party";

export const fetchCurrentParties = async () => {
  const curYear = new Date().getFullYear();
  const yearParam = `${curYear - 1}-${curYear}`;
  const response = await stortingFetch<Party>(`partier?sesjonid=${yearParam}`);
};
