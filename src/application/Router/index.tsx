import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import UserContext from "../../hooks/_context/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";

import Auth from "../../pages/Auth";
import Rooms from "../../pages/Rooms";
import RoomDetail from "../../pages/RoomDetail";
import Users from "../../pages/Users";
import UserDetail from "../../pages/UserDetail";
import NotFound from "../../pages/NotFound";

const Router = () => {
  const user = useContext(UserContext) as any;

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Rooms}
        condition={user}
        redirect="/auth"
      />
      <ProtectedRoute
        exact
        path="/auth"
        component={Auth}
        condition={!user}
        redirect="/"
      />
      <ProtectedRoute
        exact
        path="/room/:roomId"
        component={RoomDetail}
        condition={user}
        redirect="/auth"
      />
      <ProtectedRoute
        exact
        path="/users"
        component={Users}
        condition={user && user.is_super_admin}
        redirect="/auth"
      />
      <PrivateRoute
        exact
        path="/user/:userId"
        component={UserDetail}
        condition={user}
        redirect="/auth"
        privateId={user && user.uid}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
