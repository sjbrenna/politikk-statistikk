import { ApiCommittee } from "./committee";
import { ApiBasicCounty, ApiCounty } from "./county";
import { ApiBasicParty, ApiPartyItem } from "./party";
import { Prisma } from "@/prisma/generated/client";

export type PrismaPolitician = Prisma.PoliticianGetPayload<{}>;

export type ApiPolitician = {
  respons_dato_tid: string;
  versjon: string;
  doedsdato: string;
  etternavn: string;
  foedselsdato: string;
  fornavn: string;
  id: string;
  kjoenn: string;
  fylke: ApiCounty;
  parti: ApiPartyItem;
  vara_representant: boolean;
};

export type ApiPoliticianResponse = {
  respons_dato_tid: string;
  versjon: string;
  representanter_liste: ApiPolitician[];
  stortingsperiode_id: string;
};

export type ApiCurrentPolitician = {
  doedsdato: string;
  etternavn: string;
  foedselsdato: string;
  fornavn: string;
  id: string;
  kjoenn: string;
  epost: string;
  fast_vara: boolean;
  vara: boolean;
  fylke: ApiBasicCounty;
  komiteer_liste: ApiCommittee[];
  fast_vara_for: string;
  vara_for: string;
  parti: ApiBasicParty;
};

export type ApiCurrentPoliticianResponse = {
  dagensrepresentanter_liste: ApiCurrentPolitician[];
};
