import React from "react";
import "./App.css";

import Router from "./Router";
import UserContext from "../UserContext";
import useUserContext from "../useUserContext";

const App = () => {
  const userContext = useUserContext();

  return (
    <UserContext.Provider value={userContext}>
      <div>Fresh App start. - tu moze byt navigacia</div>
      <Router />
    </UserContext.Provider>
  );
};

export default App;
