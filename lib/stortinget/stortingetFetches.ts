"use server";

import { stortingFetch } from "./stortingetClient";

export const fetchCurrentParties = async () => {
  const curYear = new Date().getFullYear();
  const yearParam = `${curYear - 1}-${curYear}`;
  const response = await stortingFetch(`partier?sesjonid=${yearParam}`);
};
