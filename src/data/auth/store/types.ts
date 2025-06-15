import { User } from "@supabase/supabase-js";
import { TSignInParams, TSignUpParams } from "../repository/types";

export type TAuthState = {
  isAuthenticated: boolean;
  user: User | null;
  error: {
    signInError?: string | null;
    signUpError?: string | null;
    signOutError?: string | null;
  } | null;
};

export type TAuthActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  signIn: (params: TSignInParams) => Promise<User>;
  signUp: (params: TSignUpParams) => Promise<User>;
  signOut: () => Promise<void>;
  setError: (error: {
    signInError?: string | null;
    signUpError?: string | null;
    signOutError?: string | null;
  } | null) => void;
};