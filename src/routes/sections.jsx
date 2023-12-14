import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { auth } from 'src/sections/firebase/firebaseConfig';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ForecastPage = lazy(() => import('src/pages/forecast'));
export const LocInfoPage = lazy(() => import('src/pages/location-information'));
export const RainfallPage = lazy(() => import('src/pages/rainfall'));
export const DeviceConfigPage = lazy(() => import('src/pages/device-configuration'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const HistoricalDataPage = lazy(() => import('src/pages/historical-data'));
export const SunlightPage = lazy(() => import('src/pages/sunlight'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const PrivateRoute = ({ element, authenticated, ...rest }) =>
  <Route {...rest} element={authenticated ? element : <Navigate to="/login" />} />;

PrivateRoute.propTypes = {
  element: PropTypes.node,
  authenticated: PropTypes.bool,
};


export default function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { index: true, element: <IndexPage /> },
        { path: 'rainfall', element: <RainfallPage /> },
        { path: 'sunlight', element: <SunlightPage /> },
        { path: 'forecast', element: <ForecastPage /> },
        { path: 'location-information', element: <LocInfoPage /> },
        { path: 'device-configuration', element: <DeviceConfigPage /> },
        { path: 'historical-data', element: <HistoricalDataPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}