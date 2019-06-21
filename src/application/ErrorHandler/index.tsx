import { IError } from "../../@types/interfaces";

interface ErrorHandlerProps {
  errorBuffer: IError[];
}

const ErrorHandler = (props: ErrorHandlerProps): null => {
  console.log("ERR BUFFER", props.errorBuffer); // TODO toast

  return null;
};

export default ErrorHandler;
