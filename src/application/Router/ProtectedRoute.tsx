import React, {
  FunctionComponent,
  ReactElement,
  createElement,
  Attributes
} from "react";

import { Route, Redirect } from "react-router-dom";

interface ProtectedRouteProps {
  component: FunctionComponent;
  condition: boolean;
  redirect: string;

  privateId?: string | null;

  exact?: boolean;
  path: string;
}

const ProtectedRoute = ({
  component,
  condition,
  redirect,

  privateId,

  exact,
  path
}: ProtectedRouteProps): ReactElement => (
  <Route
    render={(props): ReactElement =>
      condition && props.match.params.userId === privateId ? (
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
