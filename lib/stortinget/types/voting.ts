import { ApiPolitician } from "./politician";

export type ApiCaseVotingOverview = {
  respons_dato_tid: string;
  versjon: string;
  sak_id: string;
  sak_votering_liste: ApiCaseVote[];
};

export type ApiCaseVote = {
  respons_dato_tid: string;
  versjon: string;
  alternativ_votering_id: string;
  antall_for: string;
  antall_ikke_tilstede: string;
  antall_mot: string;
  behandlingsrekkefoelge: string;
  dagsorden_sak_nummer: string;
  fri_votering: string;
  kommentar: string;
  mote_kart_nummer: string;
  personlig_votering: string;
  president: ApiPolitician;
  sak_id: string;
  vedtatt: string;
  votering_id: string;
  votering_resultat_type: string;
  votering_resultat_type_tekst: string;
  votering_tema: string;
  votering_tid: string;
};

export type ApiVotingDecision = {
  respons_dato_tid: string;
  versjon: string;
  vedtak_kode: string;
  vedtak_kommentar: string;
  vedtak_nummer: string;
  vedtak_referanse: string;
  vedtak_tekst: string;
};

export type ApiVotingResult = {
  respons_dato_tid: string;
  versjon: string;
  votering_id: string;
  voteringsvedtak_liste: ApiVotingDecision[];
};
