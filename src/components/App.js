import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { auth } from "../firebase";
import Router from "./Router";
import UserContext from "../UserContext";
import useUserContext from "../useUserContext";
import Navigation from "./Navigation";

const App = () => {
  const userContext = useUserContext();

  const logUserOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.info("error", err);
    }

    userContext.setUser(null);
  };

  return (
    <UserContext.Provider value={userContext}>
      <BrowserRouter>
        <header>
          <h1>Nadpis</h1>
          <Navigation />
          {userContext.user && <button onClick={logUserOut}>Odhlásiť</button>}
        </header>
        <section>
          <Router />
        </section>
        <footer>
          &copy; 2019 LSTME
          <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>kontakt</a>
        </footer>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
