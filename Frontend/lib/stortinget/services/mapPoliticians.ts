import formatXmlDate from "@/lib/formatXmlDate";
import { PrismaPolitician, ApiPolitician } from "../types/politician";

export const mapPolitician = (politician: ApiPolitician): PrismaPolitician => {
  const isVaraPol = politician.vara_representant;

  return {
    id: politician.id,
    firstName: politician.fornavn,
    lastName: politician.etternavn,
    birthday: formatXmlDate(politician.foedselsdato),
    partyId: politician.parti.id.toUpperCase(),
    representative: !isVaraPol,
    vara_representative: isVaraPol,
  };
};
