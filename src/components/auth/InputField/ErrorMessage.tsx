import React, { ReactElement } from "react";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = (props: IErrorMessageProps): ReactElement => (
  <p className="help is-danger"> {props.message} </p>
);

export default ErrorMessage;
