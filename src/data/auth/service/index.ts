import { TAuthService } from "./types";
import { TAuthRepository } from "../repository/types";
import { TSignInParams, TSignUpParams } from "../repository/types";
import { User } from "@supabase/supabase-js";

export class AuthService implements TAuthService {
  constructor(private repository: TAuthRepository) {}

  async signIn(params: TSignInParams): Promise<User> {
    return this.repository.signIn(params);
  }

  async signUp(params: TSignUpParams): Promise<User> {
    return this.repository.signUp(params);
  }

  async signOut(): Promise<void> {
    return this.repository.signOut();
  }
}