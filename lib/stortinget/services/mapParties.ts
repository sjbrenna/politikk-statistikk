//Fetch parties and transform into list of parties following type Party
import { getPartyLogo, PartyResourceId } from "../parties/partyResources";
import { Party, ApiPartyItem } from "../types/party";

export const mapParty = (party: ApiPartyItem): Party => {
  return {
    id: party.id.toUpperCase(),
    name: party.navn,
    logoURL: getPartyLogo(party.id.toUpperCase() as PartyResourceId)!,
  };
};
