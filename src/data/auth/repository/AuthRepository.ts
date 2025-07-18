import { TAuthRepository, TSignUpParams } from './types';
import { TSignInParams } from './types';
import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from '@/database.types';

export class AuthRepository implements TAuthRepository {
  constructor(private repository: SupabaseClient<Database>) { }

  async signIn(params: TSignInParams): Promise<User> {
    const { data, error } = await this.repository.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error('Sign in user not found');
    }

    return data.user;
  }

  async signUp(params: TSignUpParams): Promise<User> {
    const { data, error } = await this.repository.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          full_name: params.fullName,
        },
      },
    });


    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error('Sign up user not found');
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    await this.repository.auth.signOut();
  }

  async getSession(): Promise<{
    user?: User | null;
    session: Session | null;
  }> {
    const { data, error } = await this.repository.auth.getSession();

    if (error) {
      throw error;
    }

    return {
      user: data.session?.user,
      session: data.session,
    };
  }
}
