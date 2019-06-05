import React from "react";
import IUser from "../../interfaces/IUser";

const UserContext = React.createContext<IUser | null | undefined>(undefined);

export default UserContext;
