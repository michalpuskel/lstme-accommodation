import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import RoomDetailScreen from "./RoomDetailScreen";
import UsersScreen from "./UsersScreen";
import UserDetailScreen from "./UserDetailScreen";
import NotFoundScreen from "./NotFoundScreen";

import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import UserContext from "../UserContext";

class Router extends Component {
  render() {
    const user = this.context.user;

    return (
      <BrowserRouter>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={HomeScreen}
            condition={user}
            redirect="login"
          />
          <ProtectedRoute
            path="/login"
            component={LoginScreen}
            condition={!user}
            redirect="/"
          />
          <ProtectedRoute
            path="/registration"
            component={RegistrationScreen}
            condition={!user}
            redirect="/"
          />
          <ProtectedRoute
            path="/room/:roomId"
            component={RoomDetailScreen}
            condition={user}
            redirect="/login"
          />
          <ProtectedRoute
            path="/users"
            component={UsersScreen}
            condition={user && user.is_super_admin}
            redirect="/login"
          />
          <PrivateRoute
            path="/user/:userId"
            component={UserDetailScreen}
            condition={user}
            redirect="/login"
            privateId={user && user.uid}
          />
          <Route component={NotFoundScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

Router.contextType = UserContext;

export default Router;
