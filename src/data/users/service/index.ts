import { TUsersService } from './types';
import { TUsersRepository } from '../repository/types';
import { TUser } from '../enitites/types';

export class UsersService implements TUsersService {
  constructor(private repository: TUsersRepository) { }

  async getUser(userProviderId: string): Promise<TUser> {
    return this.repository.getUser(userProviderId);
  }
}
