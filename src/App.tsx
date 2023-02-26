import * as React from "react";
import { useRoutes } from "react-router-dom";
import routes from "core/routes";

export const App = () => {
  const routesHere = useRoutes(routes);

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      {routesHere}
    </React.Suspense>
  );
};
