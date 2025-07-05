import { TUser } from "../enitites/types";

export type TUsersService = {
  getUser: (userProviderId: string) => Promise<TUser>;
};