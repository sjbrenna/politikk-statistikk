type ApiPeriod = {
  respons_dato_tid: string;
  versjon: string;
  fra: Date;
  id: string;
  til: Date;
};

export type ApiPeriodResponse = {
  respons_dato_tid: string;
  versjon: string;
  innevaerende_stortingsperiode: ApiPeriod;
  stortingsperioder_liste: ApiPeriod[];
};
