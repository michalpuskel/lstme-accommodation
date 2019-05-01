import React, { useState, useEffect } from "react";
import "./App.css";

import Router from "./Router";
import UserContext from "../UserContext";
import { auth } from "../firebase";
import loadUser from "../backend";

const App = () => {
  const [user, setUser] = useState(null);
  const userContext = { user, setUser };

  useEffect(() => {
    auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const { uid, email } = currentUser;
        let user = { uid, email };

        try {
          user = await loadUser(user);
        } catch (err) {
          console.info("error", err);
        }

        setUser(user);
      } else {
        console.info("error: No user is signed in.");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={userContext}>
      <div>Fresh App start. - tu moze byt navigacia</div>
      <Router />
    </UserContext.Provider>
  );
};

export default App;
