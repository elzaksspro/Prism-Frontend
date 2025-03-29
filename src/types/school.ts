// School Types
export type SchoolType = 'primary' | 'secondary' | 'tertiary';
export type SchoolOwnership = 'federal' | 'state' | 'private';
export type SchoolStatus = 'pending' | 'approved' | 'rejected';

// School Interface
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

// Additional School Related Types
export interface SchoolFilters {
  name?: string;
  type?: SchoolType;
  ownership?: SchoolOwnership;
  lga?: string;
  state?: string;
  senatorial_district?: string;
  federal_constituency?: string;
  status?: SchoolStatus;
}

export interface SchoolStats {
  total: number;
  by_type: Record<SchoolType, number>;
  by_ownership: Record<SchoolOwnership, number>;
  by_status: Record<SchoolStatus, number>;
}