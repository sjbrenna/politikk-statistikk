import { ApiCommittee } from "./committee";
import { ApiPolitician } from "./politician";
import { ApiPublication } from "./publication";
import { ApiSubject } from "./subject";

export const CASE_STATUS: Record<string, string> = {
  "1": "behandlet",
  "2": "til_behandling",
  "3": "mottatt",
};

export type Committee = {
  respons_dato_tid: string;
  versjon: string;
  id: string;
  navn: string;
};

export type ApiCase = {
  respons_dato_tid: string;
  versjon: string;
  behandlet_sesjon_id: string | null;
  dokumentgruppe: string;
  emne_liste: ApiSubject[];
  forslagstiller_liste: ApiPolitician[];
  henvisning: string;
  id: string;
  innstilling_id: string;
  innstilling_kode: string;
  komite: Committee;
  korttittel: string;
  sak_fremmet_id: string;
  saksordfoerer_liste: ApiPolitician[];
  sist_oppdatert_dato: string;
  status: string;
  tittel: string;
  type: string;
};
export type ApiCaseResponse = {
  respons_dato_tid: string;
  versjon: string;
  saker_liste: ApiCase[];
  sesjon_id: string;
};

export type ApiDetailedCaseResponse = {
  respons_dato_tid: string;
  versjon: string;
  dokumentgruppe: string;
  emne_liste: ApiSubject[];
  ferdigbehandlet: boolean;
  henvisning: string;
  id: string;
  instillingstekst: string;
  komite: ApiCommittee;
  korttittel: string;
  kortvedtak: string;
  parentesetekst: string;
  publikasjon_referanse_liste: ApiPublication[];
  sak_nummer: string;
  sak_opphav: {
    respons_dato_tid: string;
    versjon: string;
    forslagstiller_liste: ApiPolitician[];
  };
  //TODO: Change this if necessary
  sak_relasjon_liste: string;
  sak_sesjon: string;
  saksgang: {
    respons_dato_tid: string;
    versjon: string;
    id: string;
    navn: string;
    saksgang_steg_liste: Saksgang_Steg[];
  };
  saksordfoerer_liste: ApiPolitician[];
  status: string;
  stikkord_liste: string[];
  tittel: string;
  type: string;
  vedtakstekst: string;
};

type Saksgang_Steg = {
  respons_dato_tid: string;
  versjon: string;
  id: string;
  navn: string;
  saksgang_hendelse_liste: Saksgang_Hendelse[];
};

type Saksgang_Hendelse = {
  respons_dato_tid: string;
  versjon: string;
  dato: string;
  id: string;
  publikasjonsReferanse: string;
  sorterings_nummer: string;
  stegnummer: string;
};
