import { createContext, useContext } from "react";
import { IUser } from "../../interfaces";

const UserContext = createContext<IUser | null | undefined>(undefined);

const useUserContext = () => useContext<IUser | null | undefined>(UserContext);

export default useUserContext;
