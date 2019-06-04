import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  redirect,
  privateId,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        condition && props.match.params.userId === privateId ? (
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

export default PrivateRoute;
