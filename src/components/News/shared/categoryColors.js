export const CAT_COLORS = {
  AGUA: "#0077b6",
  LUZ: "#e67e22",
  INTERNET: "#6c5ce7",
  NOVEDADES: "#e74c3c",
  INICIO: "#0b2b4a",
  SOCIAL: "#e74c3c",
  "AGUA MINERAL": "#00b894",
};

export function getCategoryColor(categoria) {
  return CAT_COLORS[categoria] ?? CAT_COLORS.INICIO;
}
