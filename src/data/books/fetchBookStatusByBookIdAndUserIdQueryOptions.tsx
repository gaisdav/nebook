import {TUserIdBookId} from './types';
import {supabase} from '@/lib/supabase.config';

export const fetchBookStatusByBookIdAndUserIdQueryOptions = (
  bookId: string,
  userId: string,
) => {
  return {
    queryKey: fetchBookStatusByBookIdAndUserIdQueryKey(bookId, userId),
    queryFn: () => fetchBookStatus({bookId, userId}),
  };
};

export const fetchBookStatusByBookIdAndUserIdQueryKey = (
  bookId: string,
  userId: string,
) => [fetchBookStatusByBookIdAndUserIdQueryKey.name, bookId, userId];

export const fetchBookStatus = async (
  params: TUserIdBookId,
): Promise<number | null> => {
  const {data, error} = await supabase
    .from('user_books')
    .select('status_id')
    .eq('user_provider_id', params.userId)
    .eq('book_provider_id', params.bookId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const status = data?.status_id || null;

  return status;
};
