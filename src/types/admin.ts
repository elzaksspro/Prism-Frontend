export interface State {
  id: string;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface LGA {
  id: string;
  name: string;
  state_id: string;
  created_at: string;
  updated_at: string;
}

export interface SenatorialDistrict {
  id: string;
  name: string;
  code: string;
  state_id: string;
  lga_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface SchoolTypeData {
  id: string;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface StatusType {
  id: string;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface BoardExam {
  id: string;
  name: string;
  code: string;
  description: string;
  exam_date: string;
  registration_deadline: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  created_at: string;
  updated_at: string;
}