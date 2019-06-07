import React from "react";
import { Route, Switch } from "react-router-dom";

import { useUserContext } from "../../hooks/_context/UserContext";
import ProtectedRoute from "./ProtectedRoute";

import Auth from "../../pages/Auth";
import Rooms from "../../pages/Rooms";
import RoomDetail from "../../pages/RoomDetail";
import Users from "../../pages/Users";
import UserDetail from "../../pages/UserDetail";
import NotFound from "../../pages/NotFound";

const Router = () => {
  const user = useUserContext();
  const isLoggedIn = !!user;
  const isSuperAdmin = !!(user && user.is_super_admin);
  const userId = user && user.uid;

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Rooms}
        condition={isLoggedIn}
        redirect="/auth"
      />
      <ProtectedRoute
        exact
        path="/auth"
        component={Auth}
        condition={!isLoggedIn}
        redirect="/"
      />
      <ProtectedRoute
        exact
        path="/room/:roomId"
        component={RoomDetail}
        condition={isLoggedIn}
        redirect="/auth"
      />
      <ProtectedRoute
        exact
        path="/users"
        component={Users}
        condition={isSuperAdmin}
        redirect="/auth"
      />
      <ProtectedRoute
        exact
        path="/user/:userId"
        component={UserDetail}
        condition={isLoggedIn}
        redirect="/auth"
        privateId={userId}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
