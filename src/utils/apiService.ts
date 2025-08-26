export interface CountryAPI {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  region: string;
  subregion?: string;
  cca2: string;
  cca3: string;
}

export interface Country {
  name: string;
  code: string;
  cca3: string;
  region: string;
  flagUrl: string;
  flagAlt?: string;
}

const API_BASE_URL = 'https://restcountries.com/v3.1';

// Cache for API responses
let countriesCache: Country[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const transformCountryData = (apiCountry: CountryAPI): Country => ({
  name: apiCountry.name.common,
  code: apiCountry.cca2,
  cca3: apiCountry.cca3,
  region: apiCountry.region,
  flagUrl: apiCountry.flags.png,
  flagAlt: apiCountry.flags.alt || `Flag of ${apiCountry.name.common}`
});

// Fisher-Yates shuffle algorithm for better randomization
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const fetchAllCountries = async (): Promise<Country[]> => {
  // Check cache first
  if (countriesCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return countriesCache;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/all?fields=name,flags,region,cca2,cca3`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: CountryAPI[] = await response.json();
    
    // Filter out countries without proper flag images or names
    const validCountries = data
      .filter(country => 
        country.name?.common && 
        country.flags?.png && 
        country.region &&
        country.cca2 &&
        country.cca3
      )
      .map(transformCountryData)
      .sort((a, b) => a.name.localeCompare(b.name));

    // Update cache
    countriesCache = validCountries;
    cacheTimestamp = Date.now();
    
    return validCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries data. Please check your internet connection.');
  }
};

export const regions = [
  "All Countries",
  "Africa", 
  "Americas",
  "Asia",
  "Europe",
  "Oceania"
];

export const getCountriesByRegion = (countries: Country[], region: string): Country[] => {
  if (region === "All Countries") return countries;
  return countries.filter(country => country.region === region);
};

export const getRandomCountries = (countries: Country[], count: number, region: string = "All Countries"): Country[] => {
  const availableCountries = getCountriesByRegion(countries, region);
  if (availableCountries.length === 0) return [];
  
  const shuffled = shuffleArray(availableCountries);
  return shuffled.slice(0, Math.min(count, availableCountries.length));
};

export const generateQuestionOptions = (correctCountry: Country, countries: Country[], region: string = "All Countries"): Country[] => {
  const availableCountries = getCountriesByRegion(countries, region);
  const otherCountries = availableCountries.filter(c => c.name !== correctCountry.name);
  
  if (otherCountries.length === 0) return [correctCountry];
  
  const wrongOptions = shuffleArray(otherCountries).slice(0, Math.min(5, otherCountries.length));
  const allOptions = [correctCountry, ...wrongOptions];
  return shuffleArray(allOptions);
};