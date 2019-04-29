import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import RoomDetailScreen from "./RoomDetailScreen";
import UsersScreen from "./UsersScreen";
import UserDetailScreen from "./UserDetailScreen";
import NotFoundScreen from "./NotFoundScreen";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/registration" component={RegistrationScreen} />
        <Route path="/room/:roomId" component={RoomDetailScreen} />
        <Route path="/users" component={UsersScreen} />
        <Route path="/user/:userId" component={UserDetailScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
