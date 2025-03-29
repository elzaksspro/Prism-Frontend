// Mock data for authentication and schools
export const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    created_at: '2024-02-06T00:00:00Z'
  },
  {
    id: '2',
    email: 'analyst@example.com',
    password: 'analyst123',
    role: 'analyst',
    created_at: '2024-02-06T00:00:00Z'
  },
  {
    id: '3',
    email: 'viewer@example.com',
    password: 'viewer123',
    role: 'viewer',
    created_at: '2024-02-06T00:00:00Z'
  }
];

// Add historical enrollment data for trend analysis
export const enrollmentTrends = [
  {
    school_id: '1',
    data: [
      { year: 2020, term: 'first', total_students: 1050, male_students: 550, female_students: 500 },
      { year: 2021, term: 'first', total_students: 1100, male_students: 580, female_students: 520 },
      { year: 2022, term: 'first', total_students: 1150, male_students: 620, female_students: 530 },
      { year: 2023, term: 'first', total_students: 1200, male_students: 650, female_students: 550 }
    ]
  },
  {
    school_id: '2',
    data: [
      { year: 2020, term: 'first', total_students: 800, male_students: 420, female_students: 380 },
      { year: 2021, term: 'first', total_students: 850, male_students: 450, female_students: 400 },
      { year: 2022, term: 'first', total_students: 900, male_students: 470, female_students: 430 },
      { year: 2023, term: 'first', total_students: 950, male_students: 500, female_students: 450 }
    ]
  }
];

// Add seasonal patterns data
export const seasonalPatterns = [
  {
    school_id: '1',
    data: [
      { year: 2023, term: 'first', enrollment: 1200, withdrawals: 20 },
      { year: 2023, term: 'second', enrollment: 1180, withdrawals: 15 },
      { year: 2023, term: 'third', enrollment: 1165, withdrawals: 25 }
    ]
  },
  {
    school_id: '2',
    data: [
      { year: 2023, term: 'first', enrollment: 950, withdrawals: 15 },
      { year: 2023, term: 'second', enrollment: 935, withdrawals: 10 },
      { year: 2023, term: 'third', enrollment: 925, withdrawals: 20 }
    ]
  }
];

// Add forecasting data
export const enrollmentForecasts = [
  {
    school_id: '1',
    forecasts: [
      { year: 2024, projected_enrollment: 1250, confidence_interval: [1200, 1300] },
      { year: 2025, projected_enrollment: 1300, confidence_interval: [1240, 1360] },
      { year: 2026, projected_enrollment: 1350, confidence_interval: [1280, 1420] }
    ]
  },
  {
    school_id: '2',
    forecasts: [
      { year: 2024, projected_enrollment: 980, confidence_interval: [950, 1010] },
      { year: 2025, projected_enrollment: 1020, confidence_interval: [980, 1060] },
      { year: 2026, projected_enrollment: 1060, confidence_interval: [1010, 1110] }
    ]
  }
];

// Update schools array with trend indicators
export const schools = [
  {
    id: '1',
    name: 'Central High School',
    type: 'secondary',
    ownership: 'state',
    lga: 'Ikeja',
    state: 'Lagos',
    senatorial_district: 'Lagos Central',
    federal_constituency: 'Ikeja',
    latitude: 6.6018,
    longitude: 3.3515,
    status: 'approved',
    total_students: 1200,
    male_students: 650,
    female_students: 550,
    average_distance: 2.5,
    accessibility_score: 85,
    catchment_coverage: 90,
    enrollment_trend: 'increasing',
    seasonal_impact: 'moderate',
    growth_rate: 5.2,
    capacity_utilization: 85,
    has_water: true,
    has_power: true,
    has_internet: true,
    has_library: true,
    has_sick_bay: true,
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  },
  {
    id: '2',
    name: 'Government College',
    type: 'secondary',
    ownership: 'federal',
    lga: 'Eti-Osa',
    state: 'Lagos',
    senatorial_district: 'Lagos East',
    federal_constituency: 'Eti-Osa',
    latitude: 6.4698,
    longitude: 3.5852,
    status: 'approved',
    total_students: 950,
    male_students: 500,
    female_students: 450,
    average_distance: 3.2,
    accessibility_score: 75,
    catchment_coverage: 85,
    enrollment_trend: 'stable',
    seasonal_impact: 'low',
    growth_rate: 3.8,
    capacity_utilization: 80,
    has_water: true,
    has_power: true,
    has_internet: true,
    has_library: true,
    has_sick_bay: false,
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  }
];

// Add infrastructure data
export const infrastructure = [
  {
    id: '1',
    school_id: '1',
    category: 'Classroom Block',
    status: 'good',
    last_inspection_date: '2024-01-15T00:00:00Z',
    notes: 'Regular maintenance required',
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  },
  {
    id: '2',
    school_id: '2',
    category: 'Laboratory',
    status: 'excellent',
    last_inspection_date: '2024-01-20T00:00:00Z',
    notes: 'Newly renovated',
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  }
];

// Add performance data
export const performance = [
  {
    id: '1',
    school_id: '1',
    year: 2023,
    exam_type: 'WAEC',
    total_students: 250,
    pass_rate: 78,
    average_score: 72,
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  },
  {
    id: '2',
    school_id: '2',
    year: 2023,
    exam_type: 'WAEC',
    total_students: 320,
    pass_rate: 85,
    average_score: 76,
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  }
];

// Add maintenance requests
export const maintenanceRequests = [
  {
    id: '1',
    school_id: '1',
    category: 'Plumbing',
    description: 'Water leak in main building',
    status: 'open',
    priority: 'high',
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  },
  {
    id: '2',
    school_id: '2',
    category: 'Electrical',
    description: 'Faulty wiring in computer lab',
    status: 'in_progress',
    priority: 'medium',
    created_at: '2024-02-06T00:00:00Z',
    updated_at: '2024-02-06T00:00:00Z'
  }
];

// Add term enrollments
export const termEnrollments = [
  {
    id: '1',
    school_id: '1',
    academic_year: '2023/2024',
    term: 'first',
    total_students: 450,
    male_students: 220,
    female_students: 230,
    new_admissions: 75,
    withdrawals: 12,
    special_needs_students: 15,
    created_at: '2023-09-15T00:00:00Z',
    updated_at: '2023-09-15T00:00:00Z'
  },
  {
    id: '2',
    school_id: '1',
    academic_year: '2023/2024',
    term: 'second',
    total_students: 465,
    male_students: 228,
    female_students: 237,
    new_admissions: 30,
    withdrawals: 15,
    special_needs_students: 16,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  }
];