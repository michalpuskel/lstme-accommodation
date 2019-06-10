import { IUser } from "../ts/interfaces";

export const userName = (user: IUser) => `${user.first_name} ${user.last_name}`;
