import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';

interface EarningsCalculatorProps {
  className?: string;
}

interface VehicleType {
  id: string;
  name: string;
  dailyRate: number;
  demandMultiplier: number;
  description: string;
}

const vehicleTypes: VehicleType[] = [
  {
    id: 'economy',
    name: 'Economy Car',
    dailyRate: 350,
    demandMultiplier: 0.8,
    description: 'Compact cars, fuel efficient'
  },
  {
    id: 'standard',
    name: 'Standard Car',
    dailyRate: 450,
    demandMultiplier: 1.0,
    description: 'Mid-size sedans, most popular'
  },
  {
    id: 'suv',
    name: 'SUV',
    dailyRate: 650,
    demandMultiplier: 1.2,
    description: 'Family vehicles, high demand'
  },
  {
    id: 'luxury',
    name: 'Luxury Car',
    dailyRate: 950,
    demandMultiplier: 0.6,
    description: 'Premium vehicles, niche market'
  }
];

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({ className = '' }) => {
  const [vehicleType, setVehicleType] = useState<string>('standard');
  const [availabilityDays, setAvailabilityDays] = useState<number[]>([20]);
  const [vehicleAge, setVehicleAge] = useState<string>('2-5');
  const [location, setLocation] = useState<string>('gaborone');

  const selectedVehicle = useMemo(() => {
    return vehicleTypes.find(v => v.id === vehicleType) || vehicleTypes[1];
  }, [vehicleType]);

  const calculations = useMemo(() => {
    const daysPerMonth = availabilityDays[0];
    const baseRate = selectedVehicle.dailyRate;
    
    // Age multiplier
    const ageMultipliers: Record<string, number> = {
      '0-2': 1.1,
      '2-5': 1.0,
      '5-10': 0.9,
      '10+': 0.8
    };
    
    // Location multiplier
    const locationMultipliers: Record<string, number> = {
      'gaborone': 1.2,
      'francistown': 1.0,
      'maun': 1.1,
      'kasane': 1.3,
      'other': 0.9
    };
    
    const ageMultiplier = ageMultipliers[vehicleAge] || 1.0;
    const locationMultiplier = locationMultipliers[location] || 1.0;
    
    const adjustedRate = baseRate * selectedVehicle.demandMultiplier * ageMultiplier * locationMultiplier;
    
    const monthlyGross = adjustedRate * daysPerMonth;
    const platformFee = monthlyGross * 0.15; // 15% platform fee
    const insurance = monthlyGross * 0.05; // 5% insurance
    const maintenance = monthlyGross * 0.08; // 8% maintenance reserve
    
    const monthlyNet = monthlyGross - platformFee - insurance - maintenance;
    const yearlyNet = monthlyNet * 12;
    
    return {
      dailyRate: Math.round(adjustedRate),
      monthlyGross: Math.round(monthlyGross),
      platformFee: Math.round(platformFee),
      insurance: Math.round(insurance),
      maintenance: Math.round(maintenance),
      monthlyNet: Math.round(monthlyNet),
      yearlyNet: Math.round(yearlyNet),
      utilizationRate: Math.round((daysPerMonth / 30) * 100)
    };
  }, [selectedVehicle, availabilityDays, vehicleAge, location]);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calculator className="h-6 w-6" />
            Earnings Calculator
          </CardTitle>
          <p className="text-blue-100">
            Estimate your potential monthly earnings as a MobiRides host
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Vehicle Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{vehicle.name}</span>
                      <span className="text-sm text-muted-foreground">{vehicle.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Availability Days */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Days Available per Month: {availabilityDays[0]} days
            </Label>
            <Slider
              value={availabilityDays}
              onValueChange={setAvailabilityDays}
              max={30}
              min={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>5 days</span>
              <span>30 days</span>
            </div>
          </div>

          {/* Vehicle Age */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Vehicle Age</Label>
            <Select value={vehicleAge} onValueChange={setVehicleAge}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years (Premium rates)</SelectItem>
                <SelectItem value="2-5">2-5 years (Standard rates)</SelectItem>
                <SelectItem value="5-10">5-10 years (Good rates)</SelectItem>
                <SelectItem value="10+">10+ years (Basic rates)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gaborone">Gaborone (High demand)</SelectItem>
                <SelectItem value="francistown">Francistown (Standard)</SelectItem>
                <SelectItem value="maun">Maun (Tourism hub)</SelectItem>
                <SelectItem value="kasane">Kasane (Premium tourism)</SelectItem>
                <SelectItem value="other">Other locations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Monthly Earnings</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-700">
                    P{calculations.monthlyNet.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600">
                    Net after fees & reserves
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Annual Potential</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-700">
                    P{calculations.yearlyNet.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600">
                    Based on current settings
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Earnings Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Daily Rate</div>
                <div className="font-semibold">P{calculations.dailyRate}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Monthly Gross</div>
                <div className="font-semibold">P{calculations.monthlyGross.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Platform Fee (15%)</div>
                <div className="font-semibold text-red-600">-P{calculations.platformFee.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Insurance & Maintenance</div>
                <div className="font-semibold text-red-600">-P{(calculations.insurance + calculations.maintenance).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Utilization Badge */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Utilization Rate:</span>
            <Badge variant={calculations.utilizationRate > 70 ? 'default' : 'secondary'}>
              {calculations.utilizationRate}%
            </Badge>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
            <strong>Disclaimer:</strong> These are estimated earnings based on average market rates and may vary depending on actual demand, seasonal factors, vehicle condition, and market conditions. Actual earnings may differ.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsCalculator;