import React from "react";

import IUser from "../../interfaces/IUser";
import { IErrorState } from "../../interfaces/IError";
import UserContext from "../../hooks/_context/UserContext";
import ErrorContext from "../../hooks/_context/ErrorContext";

import Router from "../Router";

interface AppProps {
  user: IUser | null;
  errorState: IErrorState;
}

const App = (props: AppProps) => (
  <UserContext.Provider value={props.user}>
    <ErrorContext.Provider value={props.errorState}>
      <Router />
    </ErrorContext.Provider>
  </UserContext.Provider>
);

export default App;
