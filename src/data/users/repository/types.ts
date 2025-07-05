import { TUser } from "../enitites/types";

export type TUsersRepository = {
  getUser: (userProviderId: string) => Promise<TUser>;
};