//Fetch parties and transform into list of parties following type Party

import dateTimeXmlToJson from "@/lib/dateTimeXmlToJson";
import { ApiRepresentative, Representative } from "../types/representative";

export const mapRepresentative = (
  representative: ApiRepresentative,
): Representative => {
  return {
    id: representative.id,
    firstName: representative.fornavn,
    lastName: representative.etternavn,
    birthday: dateTimeXmlToJson(representative.foedselsdato)
      .toISOString()
      .split("T")[0],
    partyId: representative.parti.id.toUpperCase(),
  };
};
