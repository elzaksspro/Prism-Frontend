// School mapping types
export interface SchoolLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  total_students: number;
  average_distance: number;
  accessibility_score: number;
  catchment_coverage: number;
  type: 'primary' | 'secondary' | 'tertiary';
  ownership: 'federal' | 'state' | 'private';
  has_water: boolean;
  has_power: boolean;
  has_internet: boolean;
}

export interface CatchmentArea {
  school_id: string;
  radius: number; // in kilometers
  population_covered: number;
  coverage_percentage: number;
  overlap_schools: string[];
}

export interface AccessibilityMetrics {
  school_id: string;
  average_distance: number;
  population_coverage: number;
  travel_time: number;
  transport_access: number;
  walking_distance_coverage: number;
}

export interface DistanceMetrics {
  school_id: string;
  average_distance: number;
  max_distance: number;
  students_within_1km: number;
  students_within_3km: number;
  students_within_5km: number;
  transport_routes: {
    type: 'walking' | 'public' | 'school_bus';
    coverage: number;
  }[];
}

export interface MapFilters {
  state: string;
  lga: string;
  school_type: string;
  school_ownership: string;
  population_min: string;
  population_max: string;
  distance_max: string;
  accessibility_min: string;
  has_water: boolean;
  has_power: boolean;
  has_internet: boolean;
}