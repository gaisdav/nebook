import { TAuthRepository, TSignUpParams } from "./types";
import { TSignInParams } from "./types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "@/database.types";

export class AuthRepository implements TAuthRepository {
  constructor(private repository: SupabaseClient<Database>) {}

  async signIn(params: TSignInParams): Promise<User> {
    const {data, error} = await this.repository.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error('User not found');
    }

    return data.user;
  }

  async signUp(params: TSignUpParams): Promise<User> {
    const {data, error} = await this.repository.auth.signUp({
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
      throw new Error('User not found');
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    await this.repository.auth.signOut();
  }
}