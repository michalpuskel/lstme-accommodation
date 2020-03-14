import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import UserContext from "../../config/UserContext";
import BanContext from "../../config/BanContext";

import Auth from "../../pages/auth/Auth";
import Rooms from "../../pages/rooms/Rooms";
import RoomDetail from "../../pages/roomDetail/RoomDetail";
import Users from "../../pages/users/Users";
import UserDetail from "../../pages/userDetail/UserDetail";
import NotFound from "../../pages/notFound/NotFound";

const Router = () => {
  const user = useContext(UserContext);
  const { ban } = useContext(BanContext);

  console.log("CONTEXT USER", user && user.email);

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Rooms}
        condition={user && !ban}
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
        condition={user && !ban}
        redirect="/auth"
      />
      <ProtectedRoute
        exact
        path="/users"
        component={Users}
        condition={user && user.is_super_admin && !ban}
        redirect="/auth"
      />
      <PrivateRoute
        exact
        path="/user/:userId"
        component={UserDetail}
        condition={user && !ban}
        redirect="/auth"
        privateId={user && user.uid}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
