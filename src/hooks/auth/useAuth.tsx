import { useState, useCallback } from "react";

import { EAuthType } from "../../@types/enums";
import useFormLogin from "./useFormLogin";
import useFormRegistration from "./useFormRegistration";
import useSubmitLoginHandler from "./useSubmitLoginHandler";
import useSubmitRegistrationHandler from "./useSubmitRegistrationHandler";

const useAuth = () => {
  const [authType, setAuthType] = useState<EAuthType>(EAuthType.Login);
  const formLogin = useFormLogin();
  const formRegistration = useFormRegistration();

  const navRegistrationHandler = useCallback(
    () => setAuthType(EAuthType.Registration),
    []
  );
  const navLoginHandler = useCallback(() => setAuthType(EAuthType.Login), []);

  const submitLoginHandler = useSubmitLoginHandler(formLogin);
  const submitRegistrationHandler = useSubmitRegistrationHandler(
    formLogin,
    formRegistration
  );

  return {
    authType,

    [EAuthType.Login]: {
      form: formLogin,
      handler: {
        nav: navLoginHandler,
        submit: submitLoginHandler
      }
    },

    [EAuthType.Registration]: {
      form: formRegistration,
      handler: {
        nav: navRegistrationHandler,
        submit: submitRegistrationHandler
      }
    }
  };
};

export default useAuth;
