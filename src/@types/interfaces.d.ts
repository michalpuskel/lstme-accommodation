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
  field: string;
  input: string;
  handler: (event: any) => void;
  id: string;
}

export interface IForm {
  [field: string]: IFormField;
}
