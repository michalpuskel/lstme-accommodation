/* eslint-disable @typescript-eslint/indent */

import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { IError } from "../../@types";

const ErrorContext = createContext<
  Dispatch<SetStateAction<IError[]>> | undefined
>(undefined);

export const usePushErrorContext = ():
  | Dispatch<SetStateAction<IError[]>>
  | undefined =>
  useContext<Dispatch<SetStateAction<IError[]>> | undefined>(ErrorContext);

export default ErrorContext;
