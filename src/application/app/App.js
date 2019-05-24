import React from "react";

import "./App.scss";
import UserContext from "../../config/UserContext";
import Router from "../router/Router";

const App = props => {
  return (
    <UserContext.Provider value={props.user}>
      <Router />
    </UserContext.Provider>
  );
};

export default App;
