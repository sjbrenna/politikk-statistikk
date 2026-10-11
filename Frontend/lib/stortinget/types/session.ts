export type ApiSession = {
  respons_dato_tid: string;
  versjon: string;
  fra: Date;
  id: string;
  til: Date;
};

export type ApiSessionResponse = {
  respons_dato_tid: string;
  versjon: string;
  innevaerende_sesjon: ApiSession;
  sesjoner_liste: ApiSession[];
};
