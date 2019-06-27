import { useState, useCallback, MouseEvent } from "react";

import { IError } from "../../@types";
import {
  IAuth,
  EAuthType,
  IFormAuthFields,
  EAuthAction
} from "../../@types/auth";

import useFormAuthReducer from "../_reducers/useFormAuthReducer";
import useSubmitLoginHandler from "./useSubmitLoginHandler";
import useSubmitRegistrationHandler from "./useSubmitRegistrationHandler";

const useAuth = (): IAuth => {
  const [authType, setAuthType] = useState<EAuthType>(EAuthType.LOGIN);
  const [formAuth, dispatch] = useFormAuthReducer();

  const onChange = (name: keyof IFormAuthFields, value: string): void =>
    dispatch({
      type: EAuthAction.UPDATE_FIELD,
      payload: { name, value }
    });

  const pushError = (field: keyof IFormAuthFields, error: IError): void =>
    dispatch({
      type: EAuthAction.UPDATE_FIELD_ERRORS,
      payload: { field, error }
    });

  const resetErrors = (field: keyof IFormAuthFields): void => {
    dispatch({
      type: EAuthAction.RESET_FIELD_ERRORS,
      payload: { field }
    });
  };

  const submitLoginHandler = useSubmitLoginHandler(formAuth);
  const submitRegistrationHandler = useSubmitRegistrationHandler(formAuth);

  const onSubmit = useCallback(
    (): ((event: MouseEvent<HTMLButtonElement>) => void) =>
      authType === EAuthType.LOGIN
        ? submitLoginHandler
        : submitRegistrationHandler,
    [authType, submitLoginHandler, submitRegistrationHandler]
  );

  return {
    type: {
      get: authType,
      set: setAuthType
    },
    form: formAuth,
    handler: {
      onChange,
      pushError,
      resetErrors,
      onSubmit
    }
  };
};

export default useAuth;
