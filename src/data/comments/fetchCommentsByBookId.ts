import { supabase } from '@/lib/supabase.config';
import { CommentsService } from './service';
import { CommentsRepository } from './repository/CommentsRepository';
import { TCommentsPaginationResult } from './service/types';
import { UsersRepository } from '@/data/users/repository/UsersRepository';

const commentsRepository = new CommentsRepository(supabase);
const usersRepository = new UsersRepository(supabase);
const commentsService = new CommentsService(commentsRepository, usersRepository);

export const fetchCommentsByBookId = async (bookId: string): Promise<TCommentsPaginationResult> => {
  return commentsService.getBookComments(bookId);
};

export const fetchCommentsByBookIdQueryKey = (bookId: string) => [
  fetchCommentsByBookIdQueryKey.name,
  bookId,
];

export const fetchCommentsByBookIdQueryOptions = (bookId: string) => {
  return {
    queryKey: fetchCommentsByBookIdQueryKey(bookId),
    queryFn: () => fetchCommentsByBookId(bookId),
  };
};
