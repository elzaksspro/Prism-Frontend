export type StaffRole = 'teacher' | 'administrator' | 'support';
export type ExperienceLevel = 'entry' | 'intermediate' | 'senior' | 'expert';
export type Qualification = 'bachelors' | 'masters' | 'doctorate' | 'teaching_cert';

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  qualification: Qualification;
  experience_level: ExperienceLevel;
  subjects: string[];
  school: string;
  certifications: string[];
  specializations: string[];
  created_at: string;
  updated_at: string;
}

export interface StaffStats {
  total_staff: number;
  by_role: Record<StaffRole, number>;
  by_qualification: Record<Qualification, number>;
  by_experience: Record<ExperienceLevel, number>;
  student_teacher_ratio: number;
  average_experience_years: number;
}