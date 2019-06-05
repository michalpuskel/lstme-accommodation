import React from "react";
import { IErrorState } from "../../interfaces/IError";

const ErrorContext = React.createContext<IErrorState | undefined>(undefined);

export default ErrorContext;
