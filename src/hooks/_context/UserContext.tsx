import { createContext, useContext } from "react";
import { IUser } from "../../ts/interfaces";

const UserContext = createContext<IUser | null | undefined>(undefined);

export const useUserContext = () =>
  useContext<IUser | null | undefined>(UserContext);

export default UserContext;
