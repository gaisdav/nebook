import { TUser } from "../enitites/types";

export type TUsersRepository = {
  getUserByProviderId: (providerId: string) => Promise<TUser>;
  getUserById: (id: number) => Promise<TUser>;
};