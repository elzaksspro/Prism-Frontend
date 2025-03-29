export interface BoardExamResult {
  id: string;
  school_id: string;
  exam_id: string;
  academic_year: string;
  total_students: number;
  passed_students: number;
  pass_rate: number;
  average_score: number;
  created_at: string;
  updated_at: string;
}

export interface SubjectResult {
  id: string;
  result_id: string;
  subject_name: string;
  total_students: number;
  passed_students: number;
  pass_rate: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  grade_a_count: number;
  grade_b_count: number;
  grade_c_count: number;
  grade_d_count: number;
  grade_f_count: number;
  created_at: string;
  updated_at: string;
}

export interface ExamResultsStats {
  overall_pass_rate: number;
  total_students: number;
  passed_students: number;
  average_score: number;
  top_subjects: {
    name: string;
    pass_rate: number;
    average_score: number;
  }[];
  grade_distribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  school_rankings: {
    school_id: string;
    school_name: string;
    pass_rate: number;
    average_score: number;
  }[];
  year_over_year: {
    year: string;
    pass_rate: number;
    average_score: number;
  }[];
}