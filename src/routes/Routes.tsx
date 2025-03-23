import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../pages/AdminDashboard';
import OwnerDashboard from '../pages/OwnerDashboard';
import TenantDashboard from '../pages/TenantDashboard';
import OwnerProfile from '../pages/OwnerProfile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TenantProfile from '../pages/TenantProfile';
//import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={isAuthenticated && userRole === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/owner"
          element={isAuthenticated && userRole === 'Owner' ? <OwnerDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/tenant"
          element={isAuthenticated && userRole === 'Tenant' ? <TenantDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/owner/profile"
          element={isAuthenticated && userRole === 'Owner' ? <OwnerProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/tenant/profile"
          element={isAuthenticated && userRole === 'Tenant' ? <TenantProfile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />

        {/* Fallback Route */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;