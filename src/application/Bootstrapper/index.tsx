import React, { useState, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { IError } from "../../@types";
import UserContext from "../../hooks/_context/UserContext";
import ErrorContext from "../../hooks/_context/ErrorContext";
import useAuthedUser from "../../hooks/user/useAuthedUser";

import Router from "../Router";
import ErrorHandler from "../ErrorHandler";
import Loading from "../../components/Loading";

// import { auth } from "../../config/firebase";

const Bootstrapper = (): ReactElement => {
  // auth.signOut();

  // auth.signInWithEmailAndPassword("test3@gmail.com", "123456");
  // auth.signInWithEmailAndPassword("test4@gmail.com", "123456");

  // **************************

  const [errorBuffer, setErrorBuffer] = useState<IError[]>([]);
  const authedUser = useAuthedUser(setErrorBuffer);

  return (
    <BrowserRouter>
      {authedUser === undefined ? (
        <Loading />
      ) : (
        <UserContext.Provider value={authedUser}>
          <ErrorContext.Provider value={setErrorBuffer}>
            <Router />
            <ErrorHandler errorBuffer={errorBuffer} />
          </ErrorContext.Provider>
        </UserContext.Provider>
      )}
    </BrowserRouter>
  );
};

export default Bootstrapper;
