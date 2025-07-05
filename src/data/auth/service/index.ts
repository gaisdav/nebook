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
    const userData = await this.usersService.getUser(user.id);

    return {
      ...userData,
      providerUserData: user,
    };
  }

  async signUp(params: TSignUpParams): Promise<TProfile> {
    const user = await this.repository.signUp(params);
    const userData = await this.usersService.getUser(user.id);

    return {
      ...userData,
      providerUserData: user,
    };
  }

  async signOut(): Promise<void> {
    return this.repository.signOut();
  }

  async getSession(): Promise<TSession> {
    const session = await this.repository.getSession();

    if (!session.user) {
      throw new Error('User not found');
    }

    const userData = await this.usersService.getUser(session.user.id);

    return {
      user: {
        ...userData,
        providerUserData: session.user,
      },
      session: session.session,
    };
  }
}
