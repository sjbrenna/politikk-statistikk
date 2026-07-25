import formatXmlDate from "@/lib/formatXmlDate";
import { Politician, ApiPolitician } from "../types/politician";
export const mapPolitician = (politician: ApiPolitician): Politician => {
  return {
    id: politician.id,
    firstName: politician.fornavn,
    lastName: politician.etternavn,
    birthday: formatXmlDate(politician.foedselsdato),
    partyId: politician.parti.id.toUpperCase(),
    governmentRole: null,
    representative: true,
  };
};
