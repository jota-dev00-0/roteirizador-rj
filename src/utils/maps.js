export const mapsLink = (paradas) => {
  const pts = paradas.map(p => encodeURIComponent(p.endereco)).join("/");
  return `https://www.google.com/maps/dir/${pts}`;
};