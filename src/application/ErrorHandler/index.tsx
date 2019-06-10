import { IError } from "../../ts/interfaces";

interface ErrorHandlerProps {
  errorBuffer: IError[];
}

const ErrorHandler = (props: ErrorHandlerProps) => {
  console.log(props.errorBuffer); // TODO toast

  return null;
};

export default ErrorHandler;
