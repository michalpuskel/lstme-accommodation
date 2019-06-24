import { useState, useCallback } from "react";

import { EAuthType } from "../../@types";
import useFormLogin from "./useFormLogin";
import useFormRegistration from "./useFormRegistration";
import useSubmitLoginHandler from "./useSubmitLoginHandler";
import useSubmitRegistrationHandler from "./useSubmitRegistrationHandler";

const useAuth = () => {
  const [authType, setAuthType] = useState<EAuthType>(EAuthType.LOGIN);
  const formLogin = useFormLogin();
  const formRegistration = useFormRegistration();

  const navRegistrationHandler = useCallback(
    () => setAuthType(EAuthType.REGISTRATION),
    []
  );
  const navLoginHandler = useCallback(() => setAuthType(EAuthType.LOGIN), []);

  const submitLoginHandler = useSubmitLoginHandler(formLogin);
  const submitRegistrationHandler = useSubmitRegistrationHandler(
    formLogin,
    formRegistration
  );

  return {
    authType,

    [EAuthType.LOGIN]: {
      form: formLogin,
      handler: {
        nav: navLoginHandler,
        submit: submitLoginHandler
      }
    },

    [EAuthType.REGISTRATION]: {
      form: formRegistration,
      handler: {
        nav: navRegistrationHandler,
        submit: submitRegistrationHandler
      }
    }
  };
};

export default useAuth;
