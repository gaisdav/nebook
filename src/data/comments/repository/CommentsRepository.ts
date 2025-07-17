import { TCommentsRepository, TCommentsPaginationParams, TCommentsPaginationResult } from './types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';
import { TCommentWithUser, TCreateCommentParams, TDBComment } from '../enitites/types';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export class CommentsRepository implements TCommentsRepository {
  constructor(private repository: SupabaseClient<Database>) { }

  async getComments(bookProviderId: string, params?: TCommentsPaginationParams): Promise<TCommentsPaginationResult> {
    const { page = 1, limit = DEFAULT_LIMIT } = params || {};
    const safeLimit = Math.min(limit, MAX_LIMIT);
    const offset = (page - 1) * safeLimit;

    // Get total count first
    const { count: totalCount } = await this.repository
      .from('book_comments')
      .select('*', { count: 'exact', head: true })
      .eq('book_provider_id', bookProviderId);

    // Get paginated comments with user data
    const { data, error } = await this.repository
      .from('book_comments')
      .select(`
        *,
        user:users(*)
      `)
      .eq('book_provider_id', bookProviderId)
      .order('created_at', { ascending: false })
      .range(offset, offset + safeLimit - 1);

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        comments: [],
        totalCount: 0,
        hasMore: false,
        nextPage: null,
      };
    }

    const comments = data as TCommentWithUser[];
    const hasMore = offset + safeLimit < (totalCount || 0);
    const nextPage = hasMore ? page + 1 : null;

    return {
      comments,
      totalCount: totalCount || 0,
      hasMore,
      nextPage,
    };
  }

  async getCommentCount(bookProviderId: string): Promise<number> {
    const { count, error } = await this.repository
      .from('book_comments')
      .select('*', { count: 'exact', head: true })
      .eq('book_provider_id', bookProviderId);

    if (error) {
      throw error;
    }

    return count || 0;
  }

  async createComment(params: TCreateCommentParams): Promise<TDBComment> {
    const { bookId, userId, content, parentId } = params;

    const { data, error } = await this.repository
      .from('book_comments')
      .insert({
        book_provider_id: bookId,
        user_id: userId,
        content,
        parent_id: parentId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}
