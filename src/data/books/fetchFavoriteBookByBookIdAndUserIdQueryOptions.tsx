import {TUserIdBookId} from './types';
import {supabase} from '@/lib/supabase.config';

export const fetchFavoriteBookByBookIdAndUserIdQueryOptions = (
  bookId: string,
  userId: number,
) => {
  return {
    queryKey: fetchFavoriteBookByBookIdAndUserIdQueryKey(bookId, userId),
    queryFn: () => fetchFavoriteBookByBookIdAndUserId({bookId, userId}),
  };
};

export const fetchFavoriteBookByBookIdAndUserIdQueryKey = (
  bookId: string,
  userId: number,
) => [fetchFavoriteBookByBookIdAndUserIdQueryOptions.name, bookId, userId];

export const fetchFavoriteBookByBookIdAndUserId = async ({
  userId,
  bookId,
}: TUserIdBookId): Promise<string | null> => {
  const {data, error} = await supabase
    .from('favorite_books')
    .select('id, user_id, book_provider_id')
    .eq('user_id', userId)
    .eq('book_provider_id', bookId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.book_provider_id || null;
};
