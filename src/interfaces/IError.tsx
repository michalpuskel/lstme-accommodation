export interface IError {
  code: string;
  data: any;
}

export interface IErrorState {
  error: IError;
  setError: any;
}
