-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image TEXT,
  price_per_day INTEGER NOT NULL,
  features TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Cars are viewable by everyone" ON cars
  FOR SELECT USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON cars TO anon;
GRANT ALL PRIVILEGES ON cars TO authenticated;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data from vehicles.json
INSERT INTO cars (id, name, category, description, image, price_per_day, features, specifications, available, rating) VALUES
('tesla-model-s', 'Tesla Model S', 'luxury', 'Premium electric sedan with autopilot', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Tesla%20Model%20S%20luxury%20electric%20sedan%20white%20color%20modern%20design%20studio%20lighting&image_size=landscape_4_3', 150, ARRAY['Autopilot', 'Premium Sound', 'Heated Seats', 'Panoramic Roof'], '{"seats": 5, "transmission": "Automatic", "fuelType": "Electric", "doors": 4}', true, 4.8),
('bmw-x5', 'BMW X5', 'suv', 'Luxury SUV with advanced features', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=BMW%20X5%20luxury%20SUV%20black%20color%20premium%20design%20studio%20lighting&image_size=landscape_4_3', 120, ARRAY['Navigation', 'Leather Seats', 'Sunroof', 'Premium Audio'], '{"seats": 7, "transmission": "Automatic", "fuelType": "Gasoline", "doors": 5}', true, 4.6),
('audi-a4', 'Audi A4', 'sedan', 'Elegant sedan with quattro all-wheel drive', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Audi%20A4%20elegant%20sedan%20silver%20color%20quattro%20premium%20design&image_size=landscape_4_3', 90, ARRAY['Quattro AWD', 'Virtual Cockpit', 'Premium Plus'], '{"seats": 5, "transmission": "Automatic", "fuelType": "Gasoline", "doors": 4}', true, 4.5),
('mercedes-c-class', 'Mercedes C-Class', 'luxury', 'Luxury sedan with advanced safety features', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Mercedes%20C-Class%20luxury%20sedan%20dark%20blue%20color%20elegant%20design&image_size=landscape_4_3', 110, ARRAY['MBUX System', 'Safety Package', 'Premium Interior'], '{"seats": 5, "transmission": "Automatic", "fuelType": "Gasoline", "doors": 4}', true, 4.7),
('toyota-camry', 'Toyota Camry', 'sedan', 'Reliable and fuel-efficient sedan', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Toyota%20Camry%20reliable%20sedan%20white%20color%20modern%20practical%20design&image_size=landscape_4_3', 70, ARRAY['Hybrid Option', 'Safety Sense', 'Fuel Efficient'], '{"seats": 5, "transmission": "Automatic", "fuelType": "Hybrid", "doors": 4}', true, 4.4);