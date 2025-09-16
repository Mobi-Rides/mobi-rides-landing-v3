import { Card } from "@/components/ui/card";
import { Fuel, GaugeCircle, Users, Star } from "lucide-react";
import type { Car } from "@/lib/supabase";
import { Separator } from "./ui/separator";

interface CarCardProps {
  car: Car;
  onClick?: () => void;
}

export const CarCard = ({ car, onClick }: CarCardProps) => {
  const getCarType = (seats: number) => {
    if (seats <= 2) return "Sports";
    if (seats <= 5) return "Sedan";
    if (seats <= 7) return "SUV";
    return "Van";
  };

  const renderStars = (rating: number = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-3 h-3 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] h-auto min-h-[20rem] sm:h-[24rem] bg-white border-gray-200 shadow-sm hover:shadow-md"
      onClick={onClick}
    >
      <div className="relative h-40 sm:h-48">
        <img
          src={car.image_url}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-car.jpg';
          }}
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 rounded-md text-xs md:text-sm bg-purple-50 text-purple-700 w-fit">
            {getCarType(car.seats)}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {renderStars(4.5)}
            </div>
            <span className="text-xs text-gray-500">
              4.5
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start mb-2 min-h-[3rem]">
          <div className="flex-1">
            <h3 className="font-semibold text-left break-words line-clamp-2 text-sm md:text-base text-gray-900">
              {car.brand} {car.model}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-purple-600">
              P{car.price_per_day}
            </p>
            <p className="text-xs text-gray-400">/day</p>
          </div>
        </div>
        <Separator className="w-full my-2 sm:my-3 bg-gray-200" />
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4 text-[0.7rem] sm:text-sm">
          <div className="flex items-center justify-left gap-1 text-sm text-gray-600">
            <GaugeCircle className="w-4 h-4 text-purple-600" />
            {car.transmission}
          </div>
          <div className="flex items-center justify-left gap-1 text-sm text-gray-600">
            <Fuel className="w-4 h-4 text-purple-600" />
            {car.fuel}
          </div>
          <div className="flex items-center justify-left gap-1 text-sm text-gray-600">
            <Users className="w-4 h-4 text-purple-600" />
            {car.seats} Seats
          </div>
        </div>
      </div>
    </Card>
  );
};