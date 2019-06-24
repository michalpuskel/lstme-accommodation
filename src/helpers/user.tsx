import { IUser } from "../@types/typings";

export const userName = (user: IUser): string =>
  `${user.first_name} ${user.last_name}`;
