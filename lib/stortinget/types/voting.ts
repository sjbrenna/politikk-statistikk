import { ApiPolitician } from "./politician";

export type ApiVotingOverview = {
  respons_dato_tid: string;
  versjon: string;
  sak_id: string;
  sak_votering_liste: ApiVote[];
};

export type ApiVote = {
  respons_dato_tid: string;
  versjon: string;
  alternativ_votering_id: string;
  antall_for: number;
  antall_ikke_tilstede: number;
  antall_mot: number;
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

export type ApiVotingSuggestion = {
  respons_dato_tid: string;
  versjon: string;
  forslag_betegnelse: string;
  forslag_betegnelse_kort: string;
  forslag_id: string;
  forslag_levert_av_parti_liste: string[];
  forslag_levert_av_representant: string | null;
  forslag_paa_vegne_av_tekst: string | null;
  forslag_sorteringsnummer: number;
  forslag_tekst: string;
  forslag_type: string;
};

export type ApiVotingSuggestionOverview = {
  respons_dato_tid: string;
  versjon: string;
  votering_id: string;
  voteringsforslag_liste: ApiVotingSuggestion[];
};
