import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { IError } from "../../interfaces";
import UserContext from "../../hooks/_context/UserContext";
import ErrorContext from "../../hooks/_context/ErrorContext";
import useAuthedUser from "../../hooks/user/useAuthedUser";

import Router from "../Router";
import ErrorHandler from "../ErrorHandler";
import Loading from "../../components/_visual/Loading";

// import { auth } from "../../config/firebase";

const Bootstrapper = () => {
  // auth.signOut();

  // auth.signInWithEmailAndPassword("test3@gmail.com", "123456");

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
