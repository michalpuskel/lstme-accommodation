import React, { FunctionComponent, Component } from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  component: FunctionComponent;
  condition: boolean;
  redirect: string;
  privateId: string;

  exact?: boolean;
  path: string;
}

const PrivateRoute = ({
  component,
  condition,
  redirect,
  privateId,

  exact,
  path
}: PrivateRouteProps) => (
  <Route
    render={props =>
      condition && props.match.params.userId === privateId ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: redirect, state: { from: props.location } }}
        />
      )
    }
    exact={exact}
    path={path}
  />
);

export default PrivateRoute;
