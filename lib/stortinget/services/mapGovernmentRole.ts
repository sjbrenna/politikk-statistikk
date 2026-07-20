import dateTimeXmlToJson from "@/lib/dateTimeXmlToJson";
import { ApiGovernmentMember, GovernmentRole } from "../types/government";
export const mapGovernmentRole = (
  governmentRole: ApiGovernmentMember,
): ApiGovernmentMember => {
  return {
    ...governmentRole,
    foedselsdato: dateTimeXmlToJson(governmentRole.foedselsdato)
      .toISOString()
      .split("T")[0],
  };
};
