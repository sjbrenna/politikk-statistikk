export type ApiSubject = {
  respons_dato_tid: string;
  versjon: string;
  er_hovedemne: boolean;
  hovedemne_id: number;
  id: number;
  navn: string;
  underemne_liste: ApiSubject[];
};

export type ApiSubjects = {
  respons_dato_tid: string;
  versjon: string;
  emne_liste: ApiSubject[];
};
