// src/routes/Routes.js
import React, { Suspense } from 'react';
import { Routes as SwitchRoute, Route, Navigate } from 'react-router-dom';

// Import routes
import { authProtectedRoutes, publicRoutes } from './routes';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoutes from './adminRoutes/AdminRoutes.js';

// Import layouts
import NonAuthLayout from "../layouts/NonAuth";
import AuthLayout from "../layouts/AuthLayout";

const AuthProtected = (props) => {
    if (props.isAuthProtected && !localStorage.getItem("authUser")) {
        return <Navigate to="/login" />;
    }

    return <>{props.children}</>;
};

const Routes = () => {
    return (
        <React.Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <SwitchRoute>
                    {/* Public routes */}
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                            key={idx}
                        />
                    ))}

                    {/* Admin routes (protected) */}
                    {/* <Route path="/admin1/*" element={
                        <PrivateRoute>
                            <AdminRoutes />
                        </PrivateRoute>
                    } /> */}

                    {/* Auth-protected routes */}
                    {authProtectedRoutes.map((route, idx) => (
                        <Route 
                            path={route.path} 
                            element={
                                <AuthProtected isAuthProtected={true}>
                                    <AuthLayout>{route.component}</AuthLayout>
                                </AuthProtected>
                            } 
                            key={idx} 
                        />
                    ))}
                </SwitchRoute>
            </Suspense>
        </React.Fragment>
    );
};

export default Routes;
