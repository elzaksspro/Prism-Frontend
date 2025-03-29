export interface FacilityData {
  id: string;
  school_id: string;
  // Water
  has_water: boolean;
  water_source: 'municipal' | 'borehole' | 'well' | 'none';
  has_water_treatment: boolean;
  
  // Power
  has_power: boolean;
  power_source: 'grid' | 'solar' | 'generator' | 'hybrid' | 'none';
  backup_power: boolean;
  
  // Internet & Facilities
  has_internet: boolean;
  internet_type: 'fiber' | 'satellite' | 'mobile' | 'none';
  has_library: boolean;
  has_sick_bay: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface FacilityLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  has_water: boolean;
  has_power: boolean;
  has_internet: boolean;
  has_library: boolean;
  has_sick_bay: boolean;
  has_all_facilities: boolean;
}

export interface FacilityStats {
  total_schools: number;
  water_availability: {
    total: number;
    by_source: Record<string, number>;
    treatment: number;
  };
  power_availability: {
    total: number;
    by_source: Record<string, number>;
    with_backup: number;
  };
  internet_availability: {
    total: number;
    by_type: Record<string, number>;
  };
  facilities: {
    libraries: number;
    sick_bays: number;
  };
  facilities_location?: FacilityLocation[];
}