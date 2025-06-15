import { User } from "@supabase/supabase-js";

export type TSignInParams = {
  email: string;
  password: string;
};

export type TSignUpParams = {
  fullName: string;
} & TSignInParams;

export type TAuthRepository = {
  signIn: (params: TSignInParams) => Promise<User>;
  signUp: (params: TSignUpParams) => Promise<User>;
  signOut: () => Promise<void>;
};