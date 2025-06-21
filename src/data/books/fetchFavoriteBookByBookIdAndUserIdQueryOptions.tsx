import {TUserIdBookId} from './types';
import {supabase} from '@/lib/supabase.config';

export const fetchFavoriteBookByBookIdAndUserIdQueryOptions = (
  bookId: string,
  userId: string,
) => {
  return {
    queryKey: fetchFavoriteBookByBookIdAndUserIdQueryKey(bookId, userId),
    queryFn: () => fetchFavoriteBookByBookIdAndUserId({bookId, userId}),
  };
};

export const fetchFavoriteBookByBookIdAndUserIdQueryKey = (
  bookId: string,
  userId: string,
) => [fetchFavoriteBookByBookIdAndUserIdQueryOptions.name, bookId, userId];

export const fetchFavoriteBookByBookIdAndUserId = async ({
  userId,
  bookId,
}: TUserIdBookId): Promise<string | null> => {
  const {data, error} = await supabase
    .from('favorite_books')
    .select('id, user_provider_id, book_provider_id')
    .eq('user_provider_id', userId)
    .eq('book_provider_id', bookId)
    .maybeSingle();

  console.log('data', data);

  if (error) {
    throw new Error(error.message);
  }

  const bookProviderId = data?.book_provider_id || null;

  return bookProviderId;
};
