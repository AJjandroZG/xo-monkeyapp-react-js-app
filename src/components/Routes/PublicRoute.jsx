import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ children, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PublicRoute;
