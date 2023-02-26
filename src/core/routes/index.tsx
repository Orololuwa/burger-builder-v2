import { RouteObject } from "react-router-dom";
import AuthGuard from "core/guards/auth.guard";
import { lazy } from "react";
import { appRoutes } from "./routes";

const Home = lazy(() => import("controllers/home/home.page"));
const SignInPage = lazy(() => import("controllers/auth/signin.page"));
const SignUpPage = lazy(() => import("controllers/auth/signup.page"));

const routes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
    path: appRoutes.HOME
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
