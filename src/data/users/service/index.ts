import { TUsersService } from './types';
import { TUsersRepository } from '../repository/types';
import { TUser } from '../enitites/types';

export class UsersService implements TUsersService {
  constructor(private repository: TUsersRepository) { }

  async getUserByProviderId(userProviderId: string): Promise<TUser> {
    return this.repository.getUserByProviderId(userProviderId);
  }

  async getUserById(userId: number): Promise<TUser> {
    return this.repository.getUserById(userId);
  }
}
