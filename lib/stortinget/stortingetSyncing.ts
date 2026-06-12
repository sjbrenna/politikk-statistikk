import { fetchCurrentParties } from "./stortingetFetches";

export const syncParties = async () => {
  const parties = await fetchCurrentParties();
  parties.forEach((party) => console.log(party));
};
