import { ApiPartyItem } from "./party";
import { Prisma } from "@/prisma/generated/client";

export type Politician = Prisma.PoliticianGetPayload<{
  include: {
    governmentRole: true;
  };
}>;

export type ApiPolitician = {
  respons_dato_tid: string;
  versjon: string;
  doedsdato: boolean;
  etternavn: string;
  foedselsdato: string;
  fornavn: string;
  id: string;
  kjoenn: string;
  fylke: {
    respons_dato_tid: string;
    versjon: string;
    historisk_fylke: boolean;
    id: string;
    navn: string;
  };
  parti: ApiPartyItem;
  vara_representant: boolean;
};

export type ApiPoliticianResponse = {
  respons_dato_tid: string;
  versjon: string;
  representanter_liste: ApiPolitician[];
  stortingsperiode_id: string;
};
