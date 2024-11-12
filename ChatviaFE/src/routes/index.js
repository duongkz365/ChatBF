import React, { Suspense } from 'react';
import { Routes as SwitchRoute, Route, Navigate } from 'react-router-dom';

//import routes
import { authProtectedRoutes, publicRoutes, callProtectedRoutes } from './routes';

//import layouts
import NonAuthLayout from "../layouts/NonAuth";
import AuthLayout from "../layouts/AuthLayout/";

const AuthProtected = (props) => {
    // if (props.isAuthProtected && !document.cookie.split('; ').find(row => row.startsWith('token='))) {
    //     return (
    //         <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    //     );
    // }
    if (
        props.isAuthProtected &&
        (!document.cookie.split('; ').find(row => row.startsWith('token=')) ||
        document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1] === "")
    ) {
        return (
            <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
        );
    }
    
    return <>{props.children}</>;
  };

/**
 * Main Route component
 */
const Routes = () => {

    return (
        // rendering the router with layout
            <React.Fragment>
            <Suspense fallback = {<div></div>} >
                <SwitchRoute>
                    {/* public routes */}

                    {callProtectedRoutes.map((route, idx) =>
                        <Route 
                            path={route.path} 
                            
                            element={
                                <NonAuthLayout>
                                    {route.component}
                                </NonAuthLayout>
                            }
                            key={idx} 
                            isAuthProtected={false} 
                        />
                    )}

                    {publicRoutes.map((route, idx) =>
                        <Route 
                            path={route.path} 
                            layout={NonAuthLayout} 
                            element={
                                <NonAuthLayout>
                                    {route.component}
                                </NonAuthLayout>
                            }
                            key={idx} 
                            isAuthProtected={false} 
                        />
                    )}

                    {/* private/auth protected routes */}
                    {authProtectedRoutes.map((route, idx) =>
                        <Route 
                            path={route.path} 
                            layout={AuthLayout} 
                            element={
                                <AuthProtected isAuthProtected={true}>
                                    <AuthLayout>{route.component}</AuthLayout>
                                </AuthProtected>
                            }
                            key={idx} 
                            isAuthProtected={true}  />
                    )}
                </SwitchRoute>
                </Suspense>
            </React.Fragment>
    );
}

export default Routes;