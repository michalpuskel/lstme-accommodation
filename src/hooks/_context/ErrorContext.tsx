import { createContext, useContext } from "react";

const ErrorContext = createContext<any>(undefined);

export const usePushErrorContext = () => useContext<any>(ErrorContext);

export default ErrorContext;
