import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  condition,
  redirect,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        condition ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: redirect, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
