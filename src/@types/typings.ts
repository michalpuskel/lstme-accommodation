export interface IUser {
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  is_supervisor: boolean;
  is_super_admin: boolean;
  room_id: string;
  swap_received_from_id: string;
  swap_sent_to_id: string;
}

export interface IError {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

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

export type test = { [field in keyof IFormAuthFields]: string };

export interface IFormAuthState {
  fields: { [field in keyof IFormAuthFields]: string };
  errors?: { [field in keyof IFormAuthFields]?: IError[] };
}

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

export interface IToggleable {
  value: boolean;
  toggle: () => void;
}
