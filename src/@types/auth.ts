import { MouseEvent } from "react";
import { IError } from ".";

export enum EAuthType {
  LOGIN = "Prihlásenie",
  REGISTRATION = "Registrácia"
}

export interface IFormAuthFields {
  email: string;
  password: string;

  passwordConfirm: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface IFormAuthState {
  fields: { [field in keyof IFormAuthFields]: string };
  errors?: {
    [field in keyof IFormAuthFields]?: IError[];
  };
}

export enum EAuthAction {
  UPDATE_FIELD,
  UPDATE_FIELD_ERRORS,
  RESET_FIELD_ERRORS
}

export interface IFormAuthUpdateFieldAction {
  type: EAuthAction.UPDATE_FIELD;
  payload: {
    name: keyof IFormAuthFields;
    value: string;
  };
}

export interface IFormAuthUpdateFieldErrorsAction {
  type: EAuthAction.UPDATE_FIELD_ERRORS;
  payload: {
    field: keyof IFormAuthFields;
    error: IError;
  };
}

export interface IFormAuthResetFieldErrorsAction {
  type: EAuthAction.RESET_FIELD_ERRORS;
  payload: {
    field: keyof IFormAuthFields;
  };
}

export interface IAuth {
  type: EAuthType;
  form: IFormAuthState;

  handler: {
    onChange: (name: keyof IFormAuthFields, value: string) => void;
    pushError: (field: keyof IFormAuthFields, error: IError) => void;
    resetErrors: (field: keyof IFormAuthFields) => void;

    [authType: EAuthType]: {
      nav: () => void;
      submit: (
        formAuth: IFormAuthState
      ) => (event: MouseEvent<HTMLButtonElement>) => void;
    };
  };
}

type TAuthType = {
  [type in EAuthType]: IAuthTypeHandlers;
};

interface IAuthTypeHandlers {
  nav: () => void;
  submit: (
    formAuth: IFormAuthState
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}
