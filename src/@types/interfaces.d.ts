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
  data?: any;
}

export interface IFormLoginState {
  email: string;
  password: string;
}

export interface IFormRegistrationState {
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface IFormAuthAction {
  field: string;
  value: string;
}

export interface IFormField {
  name: string;
  value: string;
  onChange: (name, value: string) => void;
  id: string;
}

export interface IForm {
  [field: string]: IFormField;
}

export interface IFormLogin extends IForm {
  email: IFormField;
  password: IFormField;
}

export interface IFormRegistration extends IForm {
  passwordConfirm: IFormField;
  firstName: IFormField;
  lastName: IFormField;
  birthDate: IFormField;
}

export interface IToggleable {
  value: boolean;
  toggle: CallableFunction;
}
