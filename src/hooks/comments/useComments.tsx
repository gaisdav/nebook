import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {keepPreviousData} from '@tanstack/react-query';
import {fetchCommentsByBookIdQueryOptions} from '@/data/comments/fetchCommentsByBookId';
import {fetchCommentCountByBookIdQueryOptions} from '@/data/comments/fetchCommentCountByBookId';
import {createCommentMutationOptions} from '@/data/comments/createCommentMutationOptions';
import {
  TCommentWithUser,
  UseCreateCommentParams,
} from '@/data/comments/enitites/types';

export type UseCommentsParams = {
  bookId: string;
  enabled?: boolean;
  page?: number;
  limit?: number;
};

export type UseCommentsResult = {
  comments: TCommentWithUser[];
  totalCount: number;
  isLoading: boolean;
  error: any;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
};

export const useComments = (params: UseCommentsParams): UseCommentsResult => {
  const {bookId, enabled = true, limit = 20} = params;

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    ...fetchCommentsByBookIdQueryOptions(bookId),
    enabled: enabled && !!bookId,
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

  // Flatten all comments from all pages
  const allComments = data?.pages.flatMap(page => page.comments) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    comments: allComments,
    totalCount,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage,
    refetch,
  };
};

export type UseCommentCountParams = {
  bookId: string;
  enabled?: boolean;
};

export const useCommentCount = (params: UseCommentCountParams) => {
  const {bookId, enabled = true} = params;

  return useQuery({
    ...fetchCommentCountByBookIdQueryOptions(bookId),
    enabled: enabled && !!bookId,
  });
};

export const useCreateComment = (params: UseCreateCommentParams) => {
  const {bookId, userId} = params;

  const mutation = useMutation({
    ...createCommentMutationOptions(bookId, userId),
  });

  return {
    createComment: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
