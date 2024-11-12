// src/routes/adminRoutes/AdminRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';
import Users from '../../pages/Admin/Users';
import Groups from '../../pages/Admin/Groups';
import Messages from '../../pages/Admin/Messages';
import AdminDashboard from '../../pages/Admin/AdminDashboard';
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        {/* Use relative paths */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="groups" element={<Groups />} />
        <Route path="messages" element={<Messages />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
