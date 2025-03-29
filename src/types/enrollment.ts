export type Term = 'first' | 'second' | 'third';
export type AcademicYear = string; // Format: "2024/2025"

export interface TermEnrollment {
  id: string;
  school_id: string;
  academic_year: AcademicYear;
  term: Term;
  total_students: number;
  male_students: number;
  female_students: number;
  new_admissions: number;
  withdrawals: number;
  special_needs_students: number;
  created_at: string;
  updated_at: string;
}

export interface EnrollmentStats {
  current_term: {
    term: Term;
    academic_year: AcademicYear;
    total_enrollment: number;
    male_students: number;
    female_students: number;
    new_admissions: number;
    withdrawals: number;
    special_needs_students: number;
  };
  previous_term?: {
    term: Term;
    academic_year: AcademicYear;
    total_enrollment: number;
  };
  year_over_year_growth: number;
  term_over_term_growth: number;
  enrollment_by_class: Record<string, number>;
  enrollment_trends: {
    term: Term;
    academic_year: AcademicYear;
    total_enrollment: number;
  }[];
}