import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ForecastPage = lazy(() => import('src/pages/forecast'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const DeviceConfigPage = lazy(() => import('src/pages/device-configuration'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SunlightPage = lazy(() => import('src/pages/sunlight'));
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
        { path: 'user', element: <UserPage /> },
        { path: 'sunlight', element: <SunlightPage /> },
        { path: 'forecast', element: <ForecastPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'device-configuration', element: <DeviceConfigPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
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
