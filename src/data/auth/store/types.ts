import { Session } from '@supabase/supabase-js';
import { TSignInParams, TSignUpParams } from '../repository/types';
import { TProfile } from '@/data/users/enitites/types';

export type TSession = {
  user?: TProfile | null;
  session?: Session | null;
};

export type TAuthState = {
  isAuthenticated: boolean | null;
  profile: TProfile | null;
  error: {
    signInError?: string | null;
    signUpError?: string | null;
    signOutError?: string | null;
    initAuthError?: string | null;
  } | null;
};

export type TAuthActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setProfile: (profile: TProfile) => void;
  signIn: (params: TSignInParams) => Promise<TProfile>;
  signUp: (params: TSignUpParams) => Promise<TProfile>;
  signOut: () => Promise<void>;
  setError: (error: {
    signInError?: string | null;
    signUpError?: string | null;
    signOutError?: string | null;
  } | null) => void;
  initAuth: () => Promise<void>;
};
