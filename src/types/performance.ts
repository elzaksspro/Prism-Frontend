export interface SchoolPerformanceData {
  school_name: string;
  exam_type: string;
  total_students: number;
  pass_rate: number;
  average_score: number;
  year: number;
}

export interface SubjectPerformanceData {
  name: string;
  pass_rate: number;
  total_students: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  grade_distribution: Record<string, number>;
}

export interface ExamTrendData {
  year: number;
  exam_type: string;
  pass_rate: number;
  total_students: number;
}

export interface PerformanceStats {
  overall_pass_rate: number;
  total_students: number;
  passed_students: number;
  top_subject: string;
  top_subject_score: number;
  top_subject_pass_rate: number;
  yoy_growth: number;
  previous_year_rate: number;
  current_year_rate: number;
  male_students: number;
  female_students: number;
  school_performance?: SchoolPerformanceData[];
  subject_performance?: SubjectPerformanceData[];
  exam_trends?: ExamTrendData[];
}

export interface ComparisonFilters {
  state: string;
  exam_type: string;
  year: string;
  subject: string;
  school_type: string;
  school_ownership: string;
}