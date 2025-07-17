import { CommentsService } from './service';
import { CommentsRepository } from './repository/CommentsRepository';
import { supabase } from '@/lib/supabase.config';
import { UsersRepository } from '@/data/users/repository/UsersRepository';

const commentsRepository = new CommentsRepository(supabase);
const usersRepository = new UsersRepository(supabase);
const commentsService = new CommentsService(commentsRepository, usersRepository);

export const fetchCommentCountByBookId = async (bookId: string): Promise<number> => {
  return commentsService.getCommentCount(bookId);
};

export const fetchCommentCountByBookIdQueryKey = (bookId: string) => [
  fetchCommentCountByBookIdQueryKey.name,
  bookId,
];

export const fetchCommentCountByBookIdQueryOptions = (bookId: string) => {
  return {
    queryKey: fetchCommentCountByBookIdQueryKey(bookId),
    queryFn: () => fetchCommentCountByBookId(bookId),
  };
};