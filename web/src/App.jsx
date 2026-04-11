import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login           from './pages/Login';
import AdminDashboard  from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

/**
 * App
 *
 * Root router. All routes are publicly accessible for the prototype.
 * In production, wrap role-gated routes with an <AuthGuard> component
 * that checks the user's session and role before rendering.
 *
 * Route map:
 *   /              → redirect to /login
 *   /login         → Login (role-tab switcher)
 *   /admin         → AdminDashboard
 *   /doctor        → DoctorDashboard
 *   /patient       → PatientDashboard
 *   *              → redirect to /login (catch-all)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Role dashboards */}
        <Route path="/admin"   element={<AdminDashboard />} />
        <Route path="/doctor"  element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />

        {/* Catch-all: unknown routes fall back to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
