import { fetchCurrentParties } from "./stortingetFetches";

export const syncParties = () => {
  fetchCurrentParties();
};
