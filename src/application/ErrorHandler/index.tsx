import { IError } from "../../@types";

interface IErrorHandlerProps {
  errorBuffer: IError[];
}

const ErrorHandler = (props: IErrorHandlerProps): null => {
  console.log("ERR BUFFER", props.errorBuffer); // TODO toast

  return null;
};

export default ErrorHandler;
