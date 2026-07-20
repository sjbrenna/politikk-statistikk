//Fetch parties and transform into list of parties following type Party

import dateTimeXmlToJson from "@/lib/dateTimeXmlToJson";
import { Politician, ApiPolitician } from "../types/politician";
export const mapPolitician = (politician: ApiPolitician): Politician => {
  return {
    id: politician.id,
    firstName: politician.fornavn,
    lastName: politician.etternavn,
    birthday: dateTimeXmlToJson(politician.foedselsdato)
      .toISOString()
      .split("T")[0],
    partyId: politician.parti.id.toUpperCase(),
    governmentRole: null,
  };
};
