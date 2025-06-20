import { create } from "zustand";
import { TAuthState, TAuthActions } from "./types";
import { User } from "@supabase/supabase-js";
import { TSignInParams, TSignUpParams } from "../repository/types";
import { AuthService } from "../service";
import { AuthRepository } from "../repository/AuthRepository";
import { supabase } from "@/lib/supabase.config";
import { getErrorMessage } from "@/lib/utils";

const initialState: TAuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authService = new AuthService(new AuthRepository(supabase));

export const useAuthStore = create<TAuthState & TAuthActions>((set) => ({
  ...initialState,

  setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
  setUser: (user: User) => set({user}),
  setError: (error: {
    signInError?: string | null;
    signUpError?: string | null;
    signOutError?: string | null;
  } | null) => set({error}),
  signIn: async (params: TSignInParams) => {
    try {
      const user = await authService.signIn(params);
      set({user, isAuthenticated: true});
      return user;
    } catch (error) {
      set({error: {signInError: getErrorMessage(error)}});
      throw error;
    }
  },
  signUp: async (params: TSignUpParams) => {
    try {
      const user = await authService.signUp(params);
      set({user, isAuthenticated: true});
      return user;
    } catch (error) {
      set({error: {signUpError: getErrorMessage(error)}});
      throw error;
    }
  },
  signOut: async () => {
    try {
      await authService.signOut();
      set({user: null, isAuthenticated: false});
    } catch (error) {
      set({error: {signOutError: getErrorMessage(error)}});
      throw error;
    }
  },
}));  