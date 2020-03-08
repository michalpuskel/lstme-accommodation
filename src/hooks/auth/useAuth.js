import { useState, useCallback } from "react";

import useFormBasic from "./useFormBasic";
import useFormRegistration from "./useFormRegistration";
import useSubmitLoginHandler from "./useSubmitLoginHandler";
import useSubmitRegistrationHandler from "./useSubmitRegistrationHandler";

const useAuth = setError => {
  const [authType, setAuthType] = useState("login");
  const formBasic = useFormBasic();
  const formRegistration = useFormRegistration();

  const navRegistrationHandler = useCallback(() => {
    setAuthType("registration");
  }, [setAuthType]);

  const navLoginHandler = useCallback(() => {
    setAuthType("login");
  }, [setAuthType]);

  const submitLoginHandler = useSubmitLoginHandler(formBasic, setError);
  const submitRegistrationHandler = useSubmitRegistrationHandler({
    formBasic,
    formRegistration
  });

  return {
    authType,
    formBasic,
    formRegistration,
    navRegistrationHandler,
    navLoginHandler,
    submitLoginHandler,
    submitRegistrationHandler
  };
};

export default useAuth;
