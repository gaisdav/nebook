import { TSignInParams, TSignUpParams } from "../repository/types";
import { TProfile } from "@/data/users/enitites/types";
import { TSession } from "../store/types";

export type TAuthService = {
  getSession: () => Promise<TSession>;
  signIn: (params: TSignInParams) => Promise<TProfile>;
  signUp: (params: TSignUpParams) => Promise<TProfile>;
  signOut: () => Promise<void>;
};