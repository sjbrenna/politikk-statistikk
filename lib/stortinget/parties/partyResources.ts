export const partyResources = {
  A: {
    name: "Arbeiderpartiet",
    logo: "/logos/ap.png",
  },
  FRP: {
    name: "Fremskrittspartiet",
    logo: "/logos/frp.png",
  },
  H: {
    name: "Høyre",
    logo: "/logos/h.png",
  },
  KRF: {
    name: "Kristelig Folkeparti",
    logo: "/logos/krf.png",
  },
  MDG: {
    name: "Miljøpartiet De Grønne",
    logo: "/logos/mdg.png",
  },
  R: {
    name: "Rødt",
    logo: "/logos/r.png",
  },
  SP: {
    name: "Senterpartiet",
    logo: "/logos/sp.png",
  },
  SV: {
    name: "Sosialistisk Venstreparti",
    logo: "/logos/sv.png",
  },
  V: {
    name: "Venstre",
    logo: "/logos/v.png",
  },
} as const;

export type PartyResourceId = keyof typeof partyResources;

export const getPartyLogo = (name: keyof typeof partyResources) => {
  return partyResources[name].logo;
};

export const getPartyName = (name: keyof typeof partyResources) => {
  return partyResources[name].name;
};
