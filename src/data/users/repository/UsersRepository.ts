import { TUsersRepository } from './types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';
import { TUser } from '../enitites/types';

export class UsersRepository implements TUsersRepository {
  constructor(private repository: SupabaseClient<Database>) { }

  async getUser(userProviderId: string): Promise<TUser> {
    const { data, error } = await this.repository.from('users').select('*').eq('provider_id', userProviderId).single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('User not found');
    }

    return data;
  }
}
