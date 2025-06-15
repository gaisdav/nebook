import { TAuthRepository } from "../repository/types";
import { TSignInParams, TSignUpParams } from "../repository/types";
import { User } from "@supabase/supabase-js";

export type TAuthService = {
  signIn: (params: TSignInParams) => Promise<User>;
  signUp: (params: TSignUpParams) => Promise<User>;
  signOut: () => Promise<void>;
};