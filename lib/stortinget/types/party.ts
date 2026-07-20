import { Prisma } from "@/prisma/generated/client";

export type Party = Prisma.PartyGetPayload<{}>;

export type ApiPartyItem = {
  respons_dato_tid: string;
  versjon: string;
  id: string;
  navn: string;
  representert_parti: boolean;
};

export type ApiPartyResponse = {
  respons_dato_tid: string;
  versjon: string;
  partier_liste: ApiPartyItem[];
  sesjon_id: string | null;
  stortingsperiode_id: string;
};
