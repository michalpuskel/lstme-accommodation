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

export interface IToggleable {
  value: boolean;
  toggle: () => void;
}
