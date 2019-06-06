import React, { FunctionComponent, createElement, Attributes } from "react";
import { Route, Redirect } from "react-router-dom";

interface ProtectedRouteProps {
  component: FunctionComponent;
  condition: boolean;
  redirect: string;

  exact?: boolean;
  path: string;
}

const ProtectedRoute = ({
  component,
  condition,
  redirect,

  exact,
  path
}: ProtectedRouteProps) => (
  <Route
    render={props =>
      condition ? (
        createElement(component, { ...(props as Attributes) }, null)
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

export default ProtectedRoute;
