import { IError } from ".";

export enum EAuthType {
  LOGIN,
  REGISTRATION
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
  fields: IFormAuthStateFields;
  errors?: IFormAuthStateErrors;
}
export type IFormAuthStateFields = { [field in keyof IFormAuthFields]: string };
export type IFormAuthStateErrors = {
  [field in keyof IFormAuthFields]?: IError[];
};

export enum EAuthAction {
  UPDATE_FIELD,
  UPDATE_FIELD_ERRORS
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
