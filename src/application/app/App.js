import React from "react";

import UserContext from "../../config/UserContext";
import Router from "../router/Router";

const App = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Router />
    </UserContext.Provider>
  );
};

export default App;
