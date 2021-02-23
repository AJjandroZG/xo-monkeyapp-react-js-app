import React from "react";
import { privateRoutes,publicRoutes } from "../../commons/const";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Switch, Route } from "react-router-dom";

const Routes = ({authed}) => {
  return (
    <Switch>
      {privateRoutes.map((privateRoute, i) => (
        <PrivateRoute
          key={i}
          authed={authed}
          path={privateRoute.location}
          exact={privateRoute.exact}
        >{privateRoute.component}
        </PrivateRoute>
      ))}
      {publicRoutes.map((privateRoute, i) => (
        <PublicRoute
          key={i}
          authed={authed}
          path={privateRoute.location}
          exact={privateRoute.exact}
        >{privateRoute.component}
        </PublicRoute>
      ))}
      <Route
      render={
        ()=><h1 style={{fontSize: 30, color: "GrayText"}}>Not Found</h1>
      }
      />
    </Switch>
  );
};
export default Routes;
