const partyLogos = new Map([
  ["AP", "/logos/ap.png"],
  ["FRP", "/logos/frp.png"],
  ["H", "/logos/h.png"],
  ["KRF", "/logos/krf.png"],
  ["MDG", "/logos/mdg.png"],
  ["R", "/logos/r.png"],
  ["SP", "/logos/sp.png"],
  ["SV", "/logos/sv.png"],
  ["V", "/logos/v.png"],
]);

export const getLogo = (name: string) => {
  return partyLogos.get(name);
};
