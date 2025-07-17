import { TAuthService } from './types';
import { TAuthRepository } from '../repository/types';
import { TSignInParams, TSignUpParams } from '../repository/types';
import { TUsersService } from '@/data/users/service/types';
import { TProfile } from '@/data/users/enitites/types';
import { TSession } from '../store/types';

export class AuthService implements TAuthService {
  constructor(private repository: TAuthRepository, private usersService: TUsersService) { }

  async signIn(params: TSignInParams): Promise<TProfile> {
    const user = await this.repository.signIn(params);
    const userData = await this.usersService.getUserByProviderId(user.id);

    return {
      ...userData,
      providerUserData: user,
    };
  }

  async signUp(params: TSignUpParams): Promise<TProfile> {
    const user = await this.repository.signUp(params);
    const userData = await this.usersService.getUserByProviderId(user.id);

    return {
      ...userData,
      providerUserData: user,
    };
  }

  async signOut(): Promise<void> {
    return this.repository.signOut();
  }

  async getSession(): Promise<TSession> {
    const sessionData = await this.repository.getSession();

    let userData = null;
    if (sessionData.user) {
      userData = {
        ...(await this.usersService.getUserByProviderId(sessionData.user.id)),
        providerUserData: sessionData.user,
      };
    }

    return {
      user: userData,
      session: sessionData.session,
    };
  }
}
