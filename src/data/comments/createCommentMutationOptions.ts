import {supabase} from '@/lib/supabase.config';
import {TablesInsert} from '@/database.types';

export type TCreateCommentParams = {
  bookId: string;
  userId: number;
  content: string;
  parentId?: number | null;
};

export const createComment = async (params: TCreateCommentParams) => {
  const {bookId, userId, content, parentId = null} = params;

  const commentData: TablesInsert<'book_comments'> = {
    book_provider_id: bookId,
    user_id: userId,
    content,
    parent_id: parentId,
  };

  const {data, error} = await supabase
    .from('book_comments')
    .insert(commentData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  }

  return data;
};

export const createCommentMutationOptionsKey = (
  bookId: string,
  userId: number,
) => [createCommentMutationOptions.name, bookId, userId];

export const createCommentMutationOptions = (
  bookId: string,
  userId: number,
) => {
  return {
    mutationKey: createCommentMutationOptionsKey(bookId, userId),
    mutationFn: (params: TCreateCommentParams) => createComment(params),
  };
};
