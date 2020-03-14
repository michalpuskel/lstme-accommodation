import React from "react";

import UserContext from "../../config/UserContext";
import Router from "../router/Router";

const App = ({ user, ban }) => {
  return (
    <UserContext.Provider value={user}>
      <Router ban={ban} />
    </UserContext.Provider>
  );
};

export default App;
