import { TComment, TCreateCommentParams } from "../enitites/types";
import { TCommentWithUser } from "../enitites/types";

export type TCommentsPaginationParams = {
  page?: number;
  limit?: number;
};

export type TCommentsPaginationResult = {
  comments: TComment[];
  totalCount: number;
  hasMore: boolean;
  nextPage: number | null;
};

export type TCommentsService = {
  getBookComments: (bookProviderId: string, params?: TCommentsPaginationParams) => Promise<TCommentsPaginationResult>;
  getCommentCount: (bookProviderId: string) => Promise<number>;
  createComment: (params: TCreateCommentParams) => Promise<TCommentWithUser>;
};