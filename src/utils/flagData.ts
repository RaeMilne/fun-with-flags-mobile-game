export interface Country {
  name: string;
  code: string;
  region: string;
  flag: string;
}

export const countries: Country[] = [
  // Europe
  { name: "France", code: "FR", region: "Europe", flag: "🇫🇷" },
  { name: "Germany", code: "DE", region: "Europe", flag: "🇩🇪" },
  { name: "Italy", code: "IT", region: "Europe", flag: "🇮🇹" },
  { name: "Spain", code: "ES", region: "Europe", flag: "🇪🇸" },
  { name: "United Kingdom", code: "GB", region: "Europe", flag: "🇬🇧" },
  { name: "Netherlands", code: "NL", region: "Europe", flag: "🇳🇱" },
  { name: "Belgium", code: "BE", region: "Europe", flag: "🇧🇪" },
  { name: "Switzerland", code: "CH", region: "Europe", flag: "🇨🇭" },
  { name: "Austria", code: "AT", region: "Europe", flag: "🇦🇹" },
  { name: "Poland", code: "PL", region: "Europe", flag: "🇵🇱" },
  { name: "Sweden", code: "SE", region: "Europe", flag: "🇸🇪" },
  { name: "Norway", code: "NO", region: "Europe", flag: "🇳🇴" },
  { name: "Denmark", code: "DK", region: "Europe", flag: "🇩🇰" },
  { name: "Finland", code: "FI", region: "Europe", flag: "🇫🇮" },
  { name: "Greece", code: "GR", region: "Europe", flag: "🇬🇷" },
  { name: "Portugal", code: "PT", region: "Europe", flag: "🇵🇹" },
  { name: "Czech Republic", code: "CZ", region: "Europe", flag: "🇨🇿" },
  { name: "Hungary", code: "HU", region: "Europe", flag: "🇭🇺" },
  { name: "Ireland", code: "IE", region: "Europe", flag: "🇮🇪" },
  { name: "Croatia", code: "HR", region: "Europe", flag: "🇭🇷" },
  
  // Asia
  { name: "Japan", code: "JP", region: "Asia", flag: "🇯🇵" },
  { name: "China", code: "CN", region: "Asia", flag: "🇨🇳" },
  { name: "India", code: "IN", region: "Asia", flag: "🇮🇳" },
  { name: "South Korea", code: "KR", region: "Asia", flag: "🇰🇷" },
  { name: "Thailand", code: "TH", region: "Asia", flag: "🇹🇭" },
  { name: "Singapore", code: "SG", region: "Asia", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", region: "Asia", flag: "🇲🇾" },
  { name: "Indonesia", code: "ID", region: "Asia", flag: "🇮🇩" },
  { name: "Philippines", code: "PH", region: "Asia", flag: "🇵🇭" },
  { name: "Vietnam", code: "VN", region: "Asia", flag: "🇻🇳" },
  { name: "Bangladesh", code: "BD", region: "Asia", flag: "🇧🇩" },
  { name: "Pakistan", code: "PK", region: "Asia", flag: "🇵🇰" },
  { name: "Sri Lanka", code: "LK", region: "Asia", flag: "🇱🇰" },
  { name: "Nepal", code: "NP", region: "Asia", flag: "🇳🇵" },
  { name: "Myanmar", code: "MM", region: "Asia", flag: "🇲🇲" },
  
  // North America
  { name: "United States", code: "US", region: "North America", flag: "🇺🇸" },
  { name: "Canada", code: "CA", region: "North America", flag: "🇨🇦" },
  { name: "Mexico", code: "MX", region: "North America", flag: "🇲🇽" },
  { name: "Guatemala", code: "GT", region: "North America", flag: "🇬🇹" },
  { name: "Cuba", code: "CU", region: "North America", flag: "🇨🇺" },
  { name: "Jamaica", code: "JM", region: "North America", flag: "🇯🇲" },
  { name: "Costa Rica", code: "CR", region: "North America", flag: "🇨🇷" },
  { name: "Panama", code: "PA", region: "North America", flag: "🇵🇦" },
  
  // South America
  { name: "Brazil", code: "BR", region: "South America", flag: "🇧🇷" },
  { name: "Argentina", code: "AR", region: "South America", flag: "🇦🇷" },
  { name: "Chile", code: "CL", region: "South America", flag: "🇨🇱" },
  { name: "Peru", code: "PE", region: "South America", flag: "🇵🇪" },
  { name: "Colombia", code: "CO", region: "South America", flag: "🇨🇴" },
  { name: "Venezuela", code: "VE", region: "South America", flag: "🇻🇪" },
  { name: "Ecuador", code: "EC", region: "South America", flag: "🇪🇨" },
  { name: "Bolivia", code: "BO", region: "South America", flag: "🇧🇴" },
  { name: "Uruguay", code: "UY", region: "South America", flag: "🇺🇾" },
  { name: "Paraguay", code: "PY", region: "South America", flag: "🇵🇾" },
  
  // Africa
  { name: "Nigeria", code: "NG", region: "Africa", flag: "🇳🇬" },
  { name: "South Africa", code: "ZA", region: "Africa", flag: "🇿🇦" },
  { name: "Egypt", code: "EG", region: "Africa", flag: "🇪🇬" },
  { name: "Kenya", code: "KE", region: "Africa", flag: "🇰🇪" },
  { name: "Morocco", code: "MA", region: "Africa", flag: "🇲🇦" },
  { name: "Ghana", code: "GH", region: "Africa", flag: "🇬🇭" },
  { name: "Ethiopia", code: "ET", region: "Africa", flag: "🇪🇹" },
  { name: "Algeria", code: "DZ", region: "Africa", flag: "🇩🇿" },
  { name: "Tunisia", code: "TN", region: "Africa", flag: "🇹🇳" },
  { name: "Tanzania", code: "TZ", region: "Africa", flag: "🇹🇿" },
  
  // Oceania
  { name: "Australia", code: "AU", region: "Oceania", flag: "🇦🇺" },
  { name: "New Zealand", code: "NZ", region: "Oceania", flag: "🇳🇿" },
  { name: "Fiji", code: "FJ", region: "Oceania", flag: "🇫🇯" },
  { name: "Papua New Guinea", code: "PG", region: "Oceania", flag: "🇵🇬" },
  { name: "Samoa", code: "WS", region: "Oceania", flag: "🇼🇸" },
];

export const regions = [
  "All Countries",
  "Africa", 
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania"
];

export const getCountriesByRegion = (region: string): Country[] => {
  if (region === "All Countries") return countries;
  return countries.filter(country => country.region === region);
};

export const getRandomCountries = (count: number, region: string = "All Countries"): Country[] => {
  const availableCountries = getCountriesByRegion(region);
  const shuffled = [...availableCountries].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateQuestionOptions = (correctCountry: Country, region: string = "All Countries"): Country[] => {
  const availableCountries = getCountriesByRegion(region);
  const otherCountries = availableCountries.filter(c => c.name !== correctCountry.name);
  const wrongOptions = otherCountries.sort(() => 0.5 - Math.random()).slice(0, 4);
  const allOptions = [correctCountry, ...wrongOptions];
  return allOptions.sort(() => 0.5 - Math.random());
};