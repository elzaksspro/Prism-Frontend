import { users, schools, infrastructure, performance, maintenanceRequests, termEnrollments } from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      await delay(1);
      const mockUser = {
        id: '1',
        email,
        role: 'admin',
        created_at: new Date().toISOString()
      };
      return {
        data: {
          user: mockUser,
          session: { access_token: 'mock_token' }
        },
        error: null
      };
    },
    signOut: async () => {
      await delay(300);
      return { error: null };
    }
  },
  
  dashboard: {
    getStats: async () => {
      await delay(500);
      try {
        // Get all required data
        const schoolsData = await mockApi.schools.list();
        const performanceData = await mockApi.performance.list();
        const maintenanceData = await mockApi.maintenance.list();
        const enrollmentStats = await mockApi.enrollments.getStats();

        // Calculate statistics
        const totalSchools = schoolsData.data?.length || 0;
        const totalStudents = performanceData.data?.reduce((acc, curr) => acc + curr.total_students, 0) || 0;
        const averagePerformance = performanceData.data?.reduce((acc, curr) => acc + curr.pass_rate, 0) / (performanceData.data?.length || 1) || 0;
        const maintenanceAlerts = maintenanceData.data?.filter(req => req.status === 'open').length || 0;

        // Return formatted data
        return {
          data: {
            totalSchools,
            totalStudents,
            currentTermEnrollment: {
              total: enrollmentStats.data?.current_term?.total_enrollment || 0,
              growth: enrollmentStats.data?.term_over_term_growth || 0
            },
            totalTeachers: Math.round(totalStudents / 25), // Assuming 25:1 student-teacher ratio
            averagePerformance,
            maintenanceAlerts,
            recentActivities: maintenanceData.data || []
          },
          error: null
        };
      } catch (error) {
        console.error('Error in getStats:', error);
        return {
          data: {
            totalSchools: 0,
            totalStudents: 0,
            currentTermEnrollment: { total: 0, growth: 0 },
            totalTeachers: 0,
            averagePerformance: 0,
            maintenanceAlerts: 0,
            recentActivities: []
          },
          error: 'Failed to fetch dashboard data'
        };
      }
    }
  },

  schools: {
    list: async () => {
      await delay(500);
      return { data: schools, error: null };
    },
    getById: async (id: string) => {
      await delay(300);
      const school = schools.find(s => s.id === id);
      return { 
        data: school || null,
        error: school ? null : new Error('School not found')
      };
    }
  },
  
  infrastructure: {
    list: async (schoolId?: string) => {
      await delay(500);
      const data = schoolId 
        ? infrastructure.filter(i => i.school_id === schoolId)
        : infrastructure;
      return { data, error: null };
    }
  },
  
  performance: {
    list: async (schoolId?: string) => {
      await delay(500);
      const data = schoolId
        ? performance.filter(p => p.school_id === schoolId)
        : performance;
      return { data, error: null };
    }
  },

  maintenance: {
    list: async (schoolId?: string) => {
      await delay(500);
      const data = schoolId
        ? maintenanceRequests.filter(m => m.school_id === schoolId)
        : maintenanceRequests;
      return { data, error: null };
    }
  },

  enrollments: {
    list: async (schoolId?: string) => {
      await delay(500);
      const data = schoolId
        ? termEnrollments.filter(e => e.school_id === schoolId)
        : termEnrollments;
      return { data, error: null };
    },
    getStats: async () => {
      await delay(500);
      try {
        // Get the latest two terms for comparison
        const sortedEnrollments = [...termEnrollments].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        const currentTerm = sortedEnrollments[0];
        const previousTerm = sortedEnrollments[1];

        if (!currentTerm) {
          throw new Error('No enrollment data available');
        }

        const termOverTermGrowth = previousTerm
          ? ((currentTerm.total_students - previousTerm.total_students) / previousTerm.total_students) * 100
          : 0;

        return {
          data: {
            current_term: {
              term: currentTerm.term,
              academic_year: currentTerm.academic_year,
              total_enrollment: currentTerm.total_students
            },
            previous_term: previousTerm ? {
              term: previousTerm.term,
              academic_year: previousTerm.academic_year,
              total_enrollment: previousTerm.total_students
            } : null,
            term_over_term_growth: termOverTermGrowth
          },
          error: null
        };
      } catch (error) {
        console.error('Error in getStats:', error);
        return {
          data: {
            current_term: null,
            previous_term: null,
            term_over_term_growth: 0
          },
          error: 'Failed to fetch enrollment stats'
        };
      }
    }
  },

  facilities: {
    getStats: async (state?: string, lga?: string) => {
      await delay(500);
      try {
        // Calculate base stats
        const totalSchools = schools.length;
        const facilitiesWithWater = Math.floor(totalSchools * 0.85);
        const facilitiesWithPower = Math.floor(totalSchools * 0.90);
        const facilitiesWithInternet = Math.floor(totalSchools * 0.75);
        const facilitiesWithLibrary = Math.floor(totalSchools * 0.80);
        const facilitiesWithSickBay = Math.floor(totalSchools * 0.65);

        // Filter schools based on state and LGA if provided
        let filteredSchools = [...schools];
        if (state) {
          filteredSchools = filteredSchools.filter(s => s.state.toLowerCase() === state.toLowerCase());
        }
        if (lga) {
          filteredSchools = filteredSchools.filter(s => s.lga.toLowerCase() === lga.toLowerCase());
        }

        // Generate facility locations based on filtered schools
        const facilitiesLocation = filteredSchools.map(school => ({
          id: school.id,
          name: school.name,
          latitude: school.latitude,
          longitude: school.longitude,
          has_water: Math.random() > 0.15,
          has_power: Math.random() > 0.10,
          has_internet: Math.random() > 0.25,
          has_library: Math.random() > 0.20,
          has_sick_bay: Math.random() > 0.35,
          has_all_facilities: true // Will be calculated below
        }));

        // Calculate has_all_facilities for each location
        facilitiesLocation.forEach(facility => {
          facility.has_all_facilities = 
            facility.has_water &&
            facility.has_power &&
            facility.has_internet &&
            facility.has_library &&
            facility.has_sick_bay;
        });

        return {
          data: {
            total_schools: filteredSchools.length,
            water_availability: {
              total: 85,
              by_source: {
                municipal: 45,
                borehole: 30,
                well: 10
              },
              treatment: 65
            },
            power_availability: {
              total: 90,
              by_source: {
                grid: 70,
                solar: 15,
                generator: 5
              },
              with_backup: 45
            },
            internet_availability: {
              total: 75,
              by_type: {
                fiber: 40,
                satellite: 20,
                mobile: 15
              }
            },
            facilities: {
              libraries: facilitiesWithLibrary,
              sick_bays: facilitiesWithSickBay
            },
            facilities_location: facilitiesLocation
          },
          error: null
        };
      } catch (error) {
        console.error('Error in getStats:', error);
        return {
          data: {
            total_schools: 0,
            water_availability: {
              total: 0,
              by_source: { municipal: 0, borehole: 0, well: 0 },
              treatment: 0
            },
            power_availability: {
              total: 0,
              by_source: { grid: 0, solar: 0, generator: 0 },
              with_backup: 0
            },
            internet_availability: {
              total: 0,
              by_type: { fiber: 0, satellite: 0, mobile: 0 }
            },
            facilities: {
              libraries: 0,
              sick_bays: 0
            },
            facilities_location: []
          },
          error: 'Failed to fetch facility stats'
        };
      }
    }
  },

  trends: {
    getEnrollmentTrends: async (schoolId?: string) => {
      await delay(500);
      const data = schoolId
        ? enrollmentTrends.filter(t => t.school_id === schoolId)
        : enrollmentTrends;
      return { data, error: null };
    },

    getSeasonalPatterns: async (schoolId?: string) => {
      await delay(500);
      const data = schoolId
        ? seasonalPatterns.filter(p => p.school_id === schoolId)
        : seasonalPatterns;
      return { data, error: null };
    },

    getForecasts: async (schoolId?: string) => {
      await delay(500);
      const data = schoolId
        ? enrollmentForecasts.filter(f => f.school_id === schoolId)
        : enrollmentForecasts;
      return { data, error: null };
    },

    getYearOverYear: async (schoolId?: string) => {
      await delay(500);
      try {
        const trends = schoolId
          ? enrollmentTrends.filter(t => t.school_id === schoolId)
          : enrollmentTrends;

        const yearOverYear = trends.map(trend => {
          const yearlyGrowth = trend.data.map((curr, index) => {
            if (index === 0) return null;
            const prev = trend.data[index - 1];
            return {
              year: curr.year,
              growth_rate: ((curr.total_students - prev.total_students) / prev.total_students) * 100
            };
          }).filter(Boolean);

          return {
            school_id: trend.school_id,
            growth_rates: yearlyGrowth
          };
        });

        return { data: yearOverYear, error: null };
      } catch (error) {
        console.error('Error calculating year-over-year growth:', error);
        return { data: null, error: 'Failed to calculate growth rates' };
      }
    }
  }
};