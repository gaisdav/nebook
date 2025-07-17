import { TCommentWithUser, TCreateCommentParams, TDBComment } from '../enitites/types';

export type TCommentsPaginationParams = {
  page?: number;
  limit?: number;
};

export type TCommentsPaginationResult = {
  comments: TCommentWithUser[];
  totalCount: number;
  hasMore: boolean;
  nextPage: number | null;
};

export type TCommentsRepository = {
  getComments: (bookProviderId: string, params?: TCommentsPaginationParams) => Promise<TCommentsPaginationResult>;
  getCommentCount: (bookProviderId: string) => Promise<number>;
  createComment: (params: TCreateCommentParams) => Promise<TDBComment>;
};