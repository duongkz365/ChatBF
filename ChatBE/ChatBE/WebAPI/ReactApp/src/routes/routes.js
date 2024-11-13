// src/routes/index.js
import React from "react";
import { Navigate } from "react-router-dom";
import Users from '../pages/Admin/Users';
import Groups from '../pages/Admin/Groups';
import Messages from '../pages/Admin/Messages';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Dashboard from "../pages/dashboard";
import StarterPage from "../pages/StarterPage";

// Auth components
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Logout = React.lazy(() => import("../pages/Auth/Logout"));
const ForgetPassword = React.lazy(() => import("../pages/Auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const LockScreen = React.lazy(() => import("../pages/Auth/LockScreen"));

// Authenticated routes
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/pages-starter", component: <StarterPage /> },
  // Admin routes
  { path: "/admin/dashboard", component: <AdminDashboard /> },
  { path: "/admin/users", component: <Users /> },
  { path: "/admin/groups", component: <Groups /> },
  { path: "/admin/messages", component: <Messages /> },
  // Default route
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  // { path: "*", component: <Navigate to="/dashboard" /> },
];

// Public routes
const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forget-password", component: <ForgetPassword /> },
  { path: "/register", component: <Register /> },
  { path: "/lock-screen", component: <LockScreen /> }
];

export { authProtectedRoutes, publicRoutes };
