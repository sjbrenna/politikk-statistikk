import { Prisma } from "@/prisma/generated/client";
import { ApiPartyItem } from "./party";

export type GovernmentRole = Prisma.GovernmentRoleGetPayload<{}>;

export type ApiGovernmentMember = {
  respons_dato_tid: string;
  versjon: string;
  doedsdato: boolean;
  etternavn: string;
  foedselsdato: string;
  fornavn: string;
  id: string;
  kjoenn: string;
  departement: string;
  parti: ApiPartyItem;
  sortering: string;
  tittel: string;
  verv: string;
};

export type ApiGovernmentResponse = {
  respons_dato_tid: string;
  versjon: string;
  regjeringsmedlemmer_liste: ApiGovernmentMember[];
};
