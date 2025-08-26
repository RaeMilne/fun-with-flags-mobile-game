import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Country } from "../../utils/apiService";

interface CountryCardProps {
  country: Country;
  index: number;
  viewMode: "grid" | "list";
}

export function CountryCard({ country, index, viewMode }: CountryCardProps) {
  return (
    <Card 
      key={country.name} 
      className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-ring"
      tabIndex={0}
      role="article"
      aria-labelledby={`country-${index}-name`}
    >
      {viewMode === "grid" ? (
        <div className="p-4 space-y-3">
          <div className="aspect-[3/2] w-full overflow-hidden rounded-md">
            <ImageWithFallback
              src={country.flagUrl}
              alt={country.flagAlt || `Flag of ${country.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 
              id={`country-${index}-name`}
              className="font-medium text-center leading-tight"
            >
              {country.name}
            </h3>
            {country.region && (
              <Badge variant="secondary" className="mt-2 w-full justify-center text-xs">
                {country.region}
              </Badge>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center space-x-4">
          <div className="w-16 h-12 overflow-hidden rounded flex-shrink-0">
            <ImageWithFallback
              src={country.flagUrl}
              alt={country.flagAlt || `Flag of ${country.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              id={`country-${index}-name`}
              className="font-medium truncate"
            >
              {country.name}
            </h3>
            {country.region && (
              <Badge variant="secondary" className="mt-1 text-xs">
                {country.region}
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}