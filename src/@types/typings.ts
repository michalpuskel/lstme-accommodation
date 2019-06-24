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

interface IFormAuthFields {
  email: string;
  password: string;

  passwordConfirm: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface IFormAuthState {
  fields: { [field in keyof IFormAuthFields]: string };
  errors?: { [field in keyof IFormAuthFields]?: IError[] };
}

export enum EAuthAction {
  UPDATE_FIELD,
  UPDATE_FIELD_ERRORS
}

export interface IFormAuthAction {
  type: EAuthAction;
  payload: IFormAuthActionUpdateField | IFormAuthActionUpdateFieldErrors;
}

interface IFormAuthActionUpdateField {
  name: keyof IFormAuthFields;
  value: string;
}

interface IFormAuthActionUpdateFieldErrors {
  field: keyof IFormAuthFields;
  error: IError;
}

export interface IToggleable {
  value: boolean;
  toggle: () => void;
}
