import { TUser } from "@/data/user/entity/types";

export type TUserState = {
  user: TUser | null;
};

export type TUserActions = {
  setUser: (user: TUser) => void;
};