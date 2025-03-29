import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoginForm } from './components/auth/LoginForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { FacilityAnalytics } from './components/facilities/FacilityAnalytics';
import { PerformanceAnalytics } from './components/performance/PerformanceAnalytics';
import { DemographicsAnalytics } from './components/demographics/DemographicsAnalytics';
import { CompareAnalyze } from './components/compare/CompareAnalyze';
import { PredictiveAnalytics } from './components/analysis/PredictiveAnalytics';
import { SchoolManagement } from './components/management/schools/SchoolManagement';
import { StaffManagement } from './components/management/staff/StaffManagement';
import { GradingSchemes } from './components/management/academic/GradingSchemes';
import { UserManagement } from './components/management/users/UserManagement';
import { StateList } from './components/admin/states/StateList';
import { LGAList } from './components/admin/lga/LGAList';
import { SenatorialDistrictList } from './components/admin/senatorialDistricts/SenatorialDistrictList';
import { SchoolTypeList } from './components/admin/schoolTypes/SchoolTypeList';
import { StatusTypeList } from './components/admin/statusTypes/StatusTypeList';
import { BoardExamList } from './components/admin/boardExams/BoardExamList';
import { TermEnrollmentForm } from './components/management/academic/TermEnrollmentForm';
import { ExamResultsForm } from './components/management/academic/ExamResultsForm';
import { useAuthStore } from './stores/authStore';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore(state => state.user);
  
  if (!user) {
    return <LoginForm />;
  }

  return <Layout>{children}</Layout>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        {/* Analytics Routes */}
        <Route
          path="/facilities"
          element={
            <PrivateRoute>
              <FacilityAnalytics />
            </PrivateRoute>
          }
        />
        <Route
          path="/performance"
          element={
            <PrivateRoute>
              <PerformanceAnalytics />
            </PrivateRoute>
          }
        />
        <Route
          path="/demographics"
          element={
            <PrivateRoute>
              <DemographicsAnalytics />
            </PrivateRoute>
          }
        />
        <Route
          path="/compare"
          element={
            <PrivateRoute>
              <CompareAnalyze />
            </PrivateRoute>
          }
        />
        <Route
          path="/predictive"
          element={
            <PrivateRoute>
              <PredictiveAnalytics />
            </PrivateRoute>
          }
        />

        {/* Management Routes */}
        <Route
          path="/schools"
          element={
            <PrivateRoute>
              <SchoolManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <StaffManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/academic-records/enrollment"
          element={
            <PrivateRoute>
              <TermEnrollmentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/academic-records/exam-results"
          element={
            <PrivateRoute>
              <ExamResultsForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/grading-schemes"
          element={
            <PrivateRoute>
              <GradingSchemes />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />

        {/* Administration Routes */}
        <Route
          path="/states"
          element={
            <PrivateRoute>
              <StateList />
            </PrivateRoute>
          }
        />
        <Route
          path="/lgas"
          element={
            <PrivateRoute>
              <LGAList />
            </PrivateRoute>
          }
        />
        <Route
          path="/senatorial-districts"
          element={
            <PrivateRoute>
              <SenatorialDistrictList />
            </PrivateRoute>
          }
        />
        <Route
          path="/school-types"
          element={
            <PrivateRoute>
              <SchoolTypeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/status-types"
          element={
            <PrivateRoute>
              <StatusTypeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/board-exams"
          element={
            <PrivateRoute>
              <BoardExamList />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}