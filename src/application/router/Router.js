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
import EventList from "../../pages/EventList";

const Router = () => {
  const user = useContext(UserContext);
  const { ban } = useContext(BanContext);

  console.log("CONTEXT USER", user && user.email);

  const { event_id } = user || {};

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Rooms}
        condition={user && !ban && event_id}
        redirect={!(user && !ban) ? "/auth" : "/events"}
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
        path="/events"
        component={EventList}
        condition={user && !ban}
        redirect="/auth"
      />
      <ProtectedRoute
        exact
        path="/room/:roomId"
        component={RoomDetail}
        condition={user && !ban && event_id}
        redirect={!(user && !ban) ? "/auth" : "/events"}
      />
      <ProtectedRoute
        exact
        path="/users"
        component={Users}
        condition={user && user.is_super_admin && !ban && event_id}
        redirect={!(user && user.is_super_admin && !ban) ? "/auth" : "/events"}
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
