import { RouteObject } from "react-router-dom";
import AuthGuard from "core/guards/auth.guard";
import { lazy } from "react";

const Home = lazy(() => import("home-page"));

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
    element: <div>log in</div>,
    path: "auth/login",
  },
];

export default routes;
