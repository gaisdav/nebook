import { TUser } from "../enitites/types";

export type TUsersService = {
  getUserByProviderId: (userProviderId: string) => Promise<TUser>;
  getUserById: (userId: number) => Promise<TUser>;
};