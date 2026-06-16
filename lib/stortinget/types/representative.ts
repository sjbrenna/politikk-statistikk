import { ApiPartyItem } from "./party";

export type Representative = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  partyId: string;
};

export type ApiRepresentative = {
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

export type ApiRepresentativeResponse = {
  respons_dato_tid: string;
  versjon: string;
  representanter_liste: ApiRepresentative[];
  stortingsperiode_id: string;
};
