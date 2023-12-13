import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

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

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
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
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
