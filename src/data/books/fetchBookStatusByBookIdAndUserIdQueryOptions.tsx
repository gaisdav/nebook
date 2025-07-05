import {TUserIdBookId} from './types';
import {supabase} from '@/lib/supabase.config';
import {TBookStatus} from '@/data/books/enitites/book/types.ts';

export const fetchBookStatusByBookIdAndUserIdQueryOptions = (
  bookId: string,
  userId: number,
) => {
  return {
    queryKey: fetchBookStatusByBookIdAndUserIdQueryKey(bookId, userId),
    queryFn: () => fetchBookStatus({bookId, userId}),
  };
};

export const fetchBookStatusByBookIdAndUserIdQueryKey = (
  bookId: string,
  userId: number,
) => [fetchBookStatusByBookIdAndUserIdQueryKey.name, bookId, userId];

export const fetchBookStatus = async (
  params: TUserIdBookId,
): Promise<TBookStatus | null> => {
  const {data, error} = await supabase
    .from('user_books')
    .select('status')
    .eq('user_id', params.userId)
    .eq('book_provider_id', params.bookId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.status || null;
};
