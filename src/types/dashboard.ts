export type SchoolType = 'primary' | 'secondary' | 'tertiary';
export type SchoolOwnership = 'federal' | 'state' | 'private';
export type InfrastructureStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
export type SchoolStatus = 'pending' | 'approved' | 'rejected';
export type MaintenanceRequestStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface School {
  id: string;
  name: string;
  type: SchoolType;
  ownership: SchoolOwnership;
  lga: string;
  state: string;
  senatorial_district: string;
  federal_constituency: string;
  latitude: number;
  longitude: number;
  status: SchoolStatus;
  created_at: string;
  updated_at: string;
}

export interface Infrastructure {
  id: string;
  school_id: string;
  category: string;
  status: InfrastructureStatus;
  last_inspection_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Performance {
  id: string;
  school_id: string;
  year: number;
  metric_name: string;
  metric_value: number;
  created_at: string;
  updated_at: string;
}

export interface Demographics {
  id: string;
  school_id: string;
  year: number;
  total_students: number;
  male_students: number;
  female_students: number;
  special_needs_students: number;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceRequest {
  id: string;
  school_id: string;
  category: string;
  description: string;
  status: MaintenanceRequestStatus;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface FilterState {
  lga: string;
  state: string;
  senatorial_district: string;
  federal_constituency: string;
  year: number | null;
  school_type: SchoolType | null;
  school_ownership: SchoolOwnership | null;
  status?: SchoolStatus;
}

export interface ViewState {
  currentView: 'map' | 'table';
}