import { TBookStatus } from './enitites/book/types';

export type TGoogleBookSearchParams = {
    query: string;
    page?: number;
    limit?: number;
  };

  export type TChangeStatus = {
    userId: number;
    bookId: string;
    status: TBookStatus;
  };

  export type TUserIdBookId = {
    userId: number;
    bookId: string;
  };

  export type TUserIdStatuses = {
    userId: number;
    statuses: TBookStatus[];
  };

  export type TUserIdBookIdStatuses = {
    userId: number;
    bookId: string;
    statuses: TBookStatus[];
  };
