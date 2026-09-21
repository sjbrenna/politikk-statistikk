export type ApiCommittee = {
  respons_dato_tid: string;
  versjon: string;
  id: string;
  navn: string;
};

export type ApiCommitteeResponse = {
  respons_dato_tid: string;
  versjon: string;
  komiteer_liste: ApiCommittee[];
};
