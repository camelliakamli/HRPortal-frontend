import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login';
import DashboardLayout from '../layout/DashboardLayout';
import Home from '../pages/admin/Home';
import Employees from '../pages/admin/Employees';
import Documents from '../pages/admin/Documents';
import Requests from '../pages/admin/Demandes';
import Payroll from '../pages/admin/Payroll';
import Hierarchy from '../pages/admin/Hierarchy';
import AddEmployee from '../pages/admin/AddEmployee';
import ViewEmployeeProfile from '../pages/admin/ViewEmployeeProfile';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard route with layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/add" element={<AddEmployee />} />
        <Route path="documents" element={<Documents />} />
        <Route path="requests" element={<Requests />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="hierarchy" element={<Hierarchy />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="view-employee-profile" element={<ViewEmployeeProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
