import { RouteObject } from "react-router-dom";
import AuthGuard from "core/guards/auth.guard";
import { lazy } from "react";
import { appRoutes } from "./routes";

import DashboardLayout from "core/components/layout/dashboard-layout";
import HomeLayout from "core/components/layout/home-layout";

const Home = lazy(() => import("controllers/home/home.controller"));
const Dashboard = lazy(
  () => import("controllers/dashboard/dashboard.controller")
);
const SignInPage = lazy(() => import("controllers/auth/signin.controller"));
const SignUpPage = lazy(() => import("controllers/auth/signup.controller"));
const Orders = lazy(() => import("controllers/orders/orders.controller"));

const routes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        element: <Dashboard />,
        path: appRoutes.DASHBOARD
      },
      {
        element: <Orders />,
        path: appRoutes.ORDERS
      }
    ]
  },
  {
    element: <HomeLayout />,
    path: appRoutes.HOME,
    children: [
      {
        element: <Home />,
        index: true
      }
    ]
  },
  {
    element: <SignInPage />,
    path: appRoutes.SIGN_IN
  },
  {
    element: <SignUpPage />,
    path: appRoutes.SIGN_UP
  }
];

export default routes;
