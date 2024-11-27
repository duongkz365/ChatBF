import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';
import Users from '../../pages/Admin/Users';
import Groups from '../../pages/Admin/Groups';
import Messages from '../../pages/Admin/Messages';
import AdminDashboard from '../../pages/Admin/AdminDashboard';
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated); // Assuming you have an `Auth` state that tracks authentication status
  
  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <AdminLayout>
      <Routes>
        {/* Admin routes */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="groups" element={<Groups />} />
        <Route path="messages" element={<Messages />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
