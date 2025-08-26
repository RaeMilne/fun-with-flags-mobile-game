export const regions = [
  "All Countries", "Africa", "Americas", "Asia", "Europe", "Oceania"
];

export const getRegionEmoji = (region: string): string => {
  switch (region) {
    case "All Countries": return "🌍";
    case "Africa": return "🌍";
    case "Americas": return "🌎";
    case "Asia": return "🌏";
    case "Europe": return "🇪🇺";
    case "Oceania": return "🏝️";
    default: return "🏳️";
  }
};