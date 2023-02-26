import { RouteObject } from "react-router-dom";
import AuthGuard from "core/guards/auth.guard";
import { lazy } from "react";

const Home = lazy(() => import("views/controllers/home/home.page"));
const LoginPage = lazy(() => import("views/controllers/auth/login.page"));

const routes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
    path: "/",
  },
  {
    element: <LoginPage />,
    path: "auth/login",
  },
];

export default routes;
