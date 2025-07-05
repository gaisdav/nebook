import {supabase} from '@/lib/supabase.config';
import {Tables} from '@/database.types';

export type TComment = Tables<'book_comments'>;

export const fetchCommentsByBookId = async (bookId: string): Promise<TComment[]> => {
  const {data, error} = await supabase
    .from('book_comments')
    .select('*')
    .eq('book_provider_id', bookId)
    .order('created_at', {ascending: false});

  if (error) {
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }

  return data || [];
};

export const fetchCommentsByBookIdQueryKey = (bookId: string) => [
  fetchCommentsByBookIdQueryOptions.name,
  bookId,
];

export const fetchCommentsByBookIdQueryOptions = (bookId: string) => {
  return {
    queryKey: fetchCommentsByBookIdQueryKey(bookId),
    queryFn: () => fetchCommentsByBookId(bookId),
  };
};
