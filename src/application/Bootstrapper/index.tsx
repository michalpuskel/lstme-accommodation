import React from "react";
import { BrowserRouter } from "react-router-dom";

import useAuthedUser from "../../hooks/user/useAuthedUser";
import useError from "../../hooks/useError";

import App from "../App";
import Loading from "../../components/_visual/Loading";
import { IErrorState } from "../../interfaces/IError";

// import { auth } from "../../config/firebase";

const Bootstrapper = () => {
  // auth.signOut();

  // auth.signInWithEmailAndPassword("test4@gmail.com", "123456");

  // **************************

  const errorState = useError() as IErrorState;
  const authedUser = useAuthedUser(errorState.setError);

  return (
    <BrowserRouter>
      {authedUser === undefined ? (
        <Loading />
      ) : (
        <App user={authedUser} errorState={errorState} />
      )}
    </BrowserRouter>
  );
};

export default Bootstrapper;
