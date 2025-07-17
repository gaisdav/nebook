import {create} from 'zustand';
import {TAuthState, TAuthActions} from './types';
import {TSignInParams, TSignUpParams} from '../repository/types';
import {AuthService} from '../service';
import {AuthRepository} from '../repository/AuthRepository';
import {supabase} from '@/lib/supabase.config';
import {getErrorMessage} from '@/lib/utils';
import Toast from 'react-native-toast-message';
import {TProfile} from '@/data/users/enitites/types';
import {UsersRepository} from '@/data/users/repository/UsersRepository';

const initialState: TAuthState = {
  isAuthenticated: null,
  profile: null,
  error: null,
};

const authService = new AuthService(
  new AuthRepository(supabase),
  new UsersRepository(supabase),
);

export const useAuthStore = create<TAuthState & TAuthActions>(set => ({
  ...initialState,

  setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
  setProfile: (profile: TProfile) => set({profile}),
  setError: (
    error: {
      signInError?: string | null;
      signUpError?: string | null;
      signOutError?: string | null;
    } | null,
  ) => set({error}),
  signIn: async (params: TSignInParams) => {
    try {
      const profile = await authService.signIn(params);

      set({profile, isAuthenticated: true});
      return profile;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getErrorMessage(error),
      });
      throw error;
    }
  },
  signUp: async (params: TSignUpParams) => {
    try {
      const profile = await authService.signUp(params);
      set({profile, isAuthenticated: true});
      return profile;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getErrorMessage(error),
      });
      throw error;
    }
  },
  signOut: async () => {
    try {
      await authService.signOut();
      set({profile: null, isAuthenticated: false});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getErrorMessage(error),
      });
      throw error;
    }
  },
  initAuth: async () => {
    try {
      const {user} = await authService.getSession();
      set({profile: user, isAuthenticated: !!user});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getErrorMessage(error),
      });
      throw error;
    }
  },
}));
