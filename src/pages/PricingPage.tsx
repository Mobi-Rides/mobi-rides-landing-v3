import React, { useState, useMemo } from 'react';
import { PageLayout, PageHero } from '@/components/layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Car, 
  Users, 
  Truck, 
  Package, 
  Check, 
  TrendingUp,
  Shield,
  Award,
  Calculator,
  DollarSign
} from 'lucide-react';
import pricingData from '@/data/pricing.json';

interface RentalPeriod {
  months: number;
  monthlyRate: number;
  equityPercentage: number;
  totalEquityBuilt: number;
  buyoutPrice: number;
}

interface VehicleCategory {
  id: string;
  name: string;
  description: string;
  vehicleValue: number;
  downPaymentPercentage: number;
  rentalPeriods: RentalPeriod[];
  features: string[];
  maintenanceIncluded: boolean;
  targetCustomer: string;
  popular?: boolean;
  icon: string;
}

interface CalculatorState {
  selectedVehicle: string;
  rentalPeriod: number;
  downPayment: number;
  includeInsurance: boolean;
  includeMaintenance: boolean;
}

const PricingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('vehicles');
  const [calculator, setCalculator] = useState<CalculatorState>({
    selectedVehicle: 'sedan',
    rentalPeriod: 12,
    downPayment: 20,
    includeInsurance: false,
    includeMaintenance: false,
  });

  const vehicleCategories: VehicleCategory[] = pricingData.vehicleCategories;
  const { currencySymbol } = pricingData;

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      car: <Car className="h-6 w-6" />,
      users: <Users className="h-6 w-6" />,
      truck: <Truck className="h-6 w-6" />,
      package: <Package className="h-6 w-6" />,
    };
    return icons[iconName] || <Car className="h-6 w-6" />;
  };

  const calculatedResults = useMemo(() => {
    const selectedVehicleData = vehicleCategories.find(v => v.id === calculator.selectedVehicle);
    if (!selectedVehicleData) return null;

    const selectedPeriod = selectedVehicleData.rentalPeriods.find(
      p => p.months === calculator.rentalPeriod
    );
    if (!selectedPeriod) return null;

    const downPaymentAmount = (selectedVehicleData.vehicleValue * calculator.downPayment) / 100;
    
    let additionalMonthly = 0;
    if (calculator.includeInsurance) additionalMonthly += pricingData.defaultInsuranceRate;
    if (calculator.includeMaintenance) additionalMonthly += pricingData.extendedMaintenanceRate;

    const monthlyPayment = selectedPeriod.monthlyRate + additionalMonthly;
    const totalCost = downPaymentAmount + (monthlyPayment * selectedPeriod.months);
    const equityBuilt = selectedPeriod.totalEquityBuilt;
    const buyoutPrice = selectedPeriod.buyoutPrice;
    const equityPercentage = (equityBuilt / selectedVehicleData.vehicleValue) * 100;

    return {
      monthlyPayment,
      totalCost,
      equityBuilt,
      buyoutPrice,
      equityPercentage,
      downPaymentAmount,
      vehicleValue: selectedVehicleData.vehicleValue,
    };
  }, [calculator, vehicleCategories]);

  const handleCalculatorChange = (field: keyof CalculatorState, value: any) => {
    setCalculator(prev => ({ ...prev, [field]: value }));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MobiRides Rent-to-Buy Vehicle Leasing",
    "description": "Flexible rent-to-own vehicle plans in Botswana. Build equity with every payment.",
    "provider": {
      "@type": "Organization",
      "name": "MobiRides"
    }
  };

  return (
    <PageLayout
      title="Rent-to-Buy Vehicle Leasing | Own Your Car | MobiRides Botswana"
      description="Flexible rent-to-own vehicle plans in Botswana. Build equity with every payment. No traditional bank loans. Choose from Compact, Sedan, SUV, and Commercial vehicles starting from P2,200/month."
      keywords="rent to buy car Botswana, vehicle leasing, car ownership, flexible vehicle finance, MobiRides, rent to own Gaborone"
      jsonLd={jsonLd}
    >

      <PageHero
        title="Own Your Vehicle, Build Your Wealth"
        description="Rent-to-Buy: Convert your rental payments into ownership equity."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />Build Equity Monthly
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />Flexible Terms
            </Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="additional">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="vehicles">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehicleCategories.map(vehicle => (
                  <Card key={vehicle.id} className={vehicle.popular ? 'border-primary border-2' : ''}>
                    <CardHeader>
                      <div className="flex justify-center mb-4">{getIconComponent(vehicle.icon)}</div>
                      <CardTitle className="text-center">{vehicle.name}</CardTitle>
                      <CardDescription className="text-center">{vehicle.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4 bg-muted rounded-lg mb-4">
                        <p className="text-3xl font-bold">{currencySymbol}{vehicle.rentalPeriods[1].monthlyRate.toLocaleString()}/mo</p>
                      </div>
                      <ul className="space-y-2">
                        {vehicle.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" onClick={() => { handleCalculatorChange('selectedVehicle', vehicle.id); setActiveTab('calculator'); }}>
                        Calculate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calculator">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader><CardTitle><Calculator className="h-5 w-5 inline mr-2" />Your Details</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Vehicle</label>
                      <Select value={calculator.selectedVehicle} onValueChange={(v) => handleCalculatorChange('selectedVehicle', v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {vehicleCategories.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Period</label>
                      <Select value={calculator.rentalPeriod.toString()} onValueChange={(v) => handleCalculatorChange('rentalPeriod', parseInt(v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {vehicleCategories.find(v => v.id === calculator.selectedVehicle)?.rentalPeriods.map(p => (
                            <SelectItem key={p.months} value={p.months.toString()}>{p.months} months</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Down Payment</label>
                        <span className="text-sm">{calculator.downPayment}%</span>
                      </div>
                      <Slider value={[calculator.downPayment]} onValueChange={(v) => handleCalculatorChange('downPayment', v[0])} min={10} max={30} step={5} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ins" checked={calculator.includeInsurance} onCheckedChange={(c) => handleCalculatorChange('includeInsurance', c)} />
                        <label htmlFor="ins" className="text-sm">Enhanced Insurance</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="maint" checked={calculator.includeMaintenance} onCheckedChange={(c) => handleCalculatorChange('includeMaintenance', c)} />
                        <label htmlFor="maint" className="text-sm">Extended Maintenance</label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle><DollarSign className="h-5 w-5 inline mr-2" />Summary</CardTitle></CardHeader>
                  <CardContent>
                    {calculatedResults && (
                      <div className="space-y-6">
                        <div className="text-center py-6 bg-muted rounded-lg">
                          <p className="text-4xl font-bold text-primary">{currencySymbol}{calculatedResults.monthlyPayment.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground mt-2">per month</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Ownership</span>
                            <span className="font-semibold">{calculatedResults.equityPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={calculatedResults.equityPercentage} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-xs text-muted-foreground">Equity Built</p>
                            <p className="text-lg font-bold text-green-600">{currencySymbol}{calculatedResults.equityBuilt.toLocaleString()}</p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-xs text-muted-foreground">Buyout</p>
                            <p className="text-lg font-bold">{currencySymbol}{calculatedResults.buyoutPrice.toLocaleString()}</p>
                          </div>
                        </div>
                        <Button className="w-full" size="lg">Start Journey</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="additional">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
                {pricingData.faqs.map((faq, idx) => (
                  <Card key={idx}>
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageLayout>
  );
};

export default PricingPage;
