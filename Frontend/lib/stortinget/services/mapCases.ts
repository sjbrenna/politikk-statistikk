import formatXmlDate from "@/lib/formatXmlDate";
import { ApiCase } from "../types/case";

export const mapCases = (c: ApiCase) => {
  return {
    ...c,
    id: c.id.toString(),
    sist_oppdatert_dato: formatXmlDate(c.sist_oppdatert_dato),
  };
};
