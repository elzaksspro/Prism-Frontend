export interface SchoolDemographics {
  school_id: string;
  school_name: string;
  total_students: number;
  male_students: number;
  female_students: number;
  special_needs_students: number;
  average_age: number;
  class_size: number;
  teachers: number;
  year: number;
}

export interface DemographicsStats {
  total_students: number;
  male_students: number;
  female_students: number;
  gender_ratio: number;
  special_needs_students: number;
  special_needs_staff: number;
  total_schools: number;
  average_class_size: number;
  student_teacher_ratio: number;
  school_demographics?: SchoolDemographics[];
}

export interface DemographicsFilters {
  state: string;
  school_type: string;
  school_ownership: string;
  special_needs: boolean;
  gender_balance: boolean;
}