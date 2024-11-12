import React from "react";
import { Navigate } from "react-router-dom";


// lazy load all the views
const Dashboard = React.lazy(() => import("../pages/dashboard/index"));
const StarterPage = React.lazy(() => import("../pages/StarterPage/index"));
const VideoCall = React.lazy(()=> import("../pages/Call/VideoCall") );
const VoiceCall = React.lazy(()=> import("../pages/Call/VoiceCall") );
const CallPending = React.lazy(()=> import("../pages/Call/CallPending") );



// auth
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Logout = React.lazy(() => import("../pages/Auth/Logout"));
const ForgetPassword = React.lazy(() => import("../pages/Auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const LockScreen = React.lazy(() => import("../pages/Auth/LockScreen"));
const Admin = React.lazy(() => import("../pages/Auth/Admin"));






// declare all routes
const callProtectedRoutes = [
{path: "/video-call", component: <VideoCall/>},
{path: "/voice-call", component: <VoiceCall/>},
{path: "/call-pending", component: <CallPending/>},
];
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/pages-starter", component: <StarterPage /> },
  

    // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forget-password", component: <ForgetPassword /> },
  { path: "/register", component: <Register /> },
  { path: "/lock-screen", component: <LockScreen />},
  { path: "/admin", component: <Admin />},
  
];

export { authProtectedRoutes, publicRoutes, callProtectedRoutes };
