import { useCallback } from "react";

import { IFormLogin } from "../../@types";
import { auth } from "../../config/firebase";

const useSubmitLoginHandler = (formLogin: IFormLogin) =>
  useCallback(async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(
        formLogin.email.input,
        formLogin.password.input
      );
    } catch (error) {
      console.error(error);
    }
  }, []); // TODO inputs

export default useSubmitLoginHandler;
