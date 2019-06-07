import { createContext, useContext } from "react";

const ErrorContext = createContext<any>(undefined);

const usePushErrorContext = () => useContext<any>(ErrorContext);

export default usePushErrorContext;
