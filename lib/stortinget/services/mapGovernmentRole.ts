import formatXmlDate from "@/lib/formatXmlDate";
import { ApiGovernmentMember } from "../types/government";
export const mapGovernmentRole = (governmentRole: ApiGovernmentMember) => {
  return {
    ...governmentRole,
    foedselsdato: formatXmlDate(governmentRole.foedselsdato),
  };
};
