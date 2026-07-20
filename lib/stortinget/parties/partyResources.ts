export const partyResources = {
  A: {
    name: "Arbeiderpartiet",
    logo: "/logos/ap.png",
    color: "#e31c28",
  },
  FRP: {
    name: "Fremskrittspartiet",
    logo: "/logos/frp.png",
    color: "#004A99",
  },
  H: {
    name: "Høyre",
    logo: "/logos/h.png",
    color: "#003478",
  },
  KRF: {
    name: "Kristelig Folkeparti",
    logo: "/logos/krf.png",
    color: "#fded34",
  },
  MDG: {
    name: "Miljøpartiet De Grønne",
    logo: "/logos/mdg.png",
    color: "#009644",
  },
  R: {
    name: "Rødt",
    logo: "/logos/r.png",
    color: "#BB0A30",
  },
  SP: {
    name: "Senterpartiet",
    logo: "/logos/sp.png",
    color: "#4B8A38",
  },
  SV: {
    name: "Sosialistisk Venstreparti",
    logo: "/logos/sv.png",
    color: "#e31c28",
  },
  V: {
    name: "Venstre",
    logo: "/logos/v.png",
    color: "#006363",
  },
} as const;

export type PartyResourceId = keyof typeof partyResources;

export const getPartyLogo = (name: keyof typeof partyResources) => {
  return partyResources[name].logo;
};

export const getPartyName = (name: keyof typeof partyResources) => {
  return partyResources[name].name;
};

export const getPartyColor = (name: keyof typeof partyResources) => {
  return partyResources[name].color;
};
