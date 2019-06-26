import { useState, useCallback } from "react";

import { IError } from "../../@types";
import { EAuthType, IFormAuthFields, EAuthAction } from "../../@types/auth";

import useFormAuthReducer from "../_reducers/useFormAuthReducer";
import useSubmitLoginHandler from "./useSubmitLoginHandler";
import useSubmitRegistrationHandler from "./useSubmitRegistrationHandler";

const useAuth = (): any => {
  const [authType, setAuthType] = useState<EAuthType>(EAuthType.LOGIN);
  const [formAuth, dispatch] = useFormAuthReducer();

  const onChange = useCallback(
    (name: keyof IFormAuthFields, value: string): void =>
      dispatch({
        type: EAuthAction.UPDATE_FIELD,
        payload: { name, value }
      }),
    [dispatch]
  );

  const pushError = useCallback(
    (field: keyof IFormAuthFields, error: IError): void =>
      dispatch({
        type: EAuthAction.UPDATE_FIELD_ERRORS,
        payload: { field, error }
      }),
    [dispatch]
  );

  const resetErrors = useCallback(
    (field: keyof IFormAuthFields): void => {
      dispatch({
        type: EAuthAction.RESET_FIELD_ERRORS,
        payload: { field }
      });
    },
    [dispatch]
  );

  const navRegistrationHandler = useCallback(
    (): void => setAuthType(EAuthType.REGISTRATION),
    []
  );
  const navLoginHandler = useCallback(
    (): void => setAuthType(EAuthType.LOGIN),
    []
  );

  const submitLoginHandler = useSubmitLoginHandler(formAuth);
  const submitRegistrationHandler = useSubmitRegistrationHandler(formAuth);

  return {
    type: authType,
    form: formAuth,

    handler: {
      onChange,
      pushError,
      resetErrors,

      [EAuthType.LOGIN]: {
        nav: navRegistrationHandler,
        submit: submitLoginHandler
      },

      [EAuthType.REGISTRATION]: {
        nav: navLoginHandler,
        submit: submitRegistrationHandler
      }
    }
  };
};

export default useAuth;
