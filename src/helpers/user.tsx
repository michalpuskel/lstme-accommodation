import { IUser } from "../@types/interfaces";

export const userName = (user: IUser) => `${user.first_name} ${user.last_name}`;
