import { IBook } from '@/data/books/enitites/book/types.ts';
import { IBookList } from '@/data/books/store/types.ts';

export type TGoogleBookSearchParams = {
  query: string;
  page?: number;
  limit?: number;
};

export type TChangeStatus = {
  userId: number;
  bookId: string;
  status: number;
};

export type TUserIdBookId = {
  userId: number;
  bookId: string;
};

export type TUserIdStatuses = {
  userId: number;
  statuses: number[];
};

export type TUserIdBookIdStatuses = {
  userId: number;
  bookId: string;
  statuses: number[];
};

export type TBooksService = {
  searchBooks: (params: TGoogleBookSearchParams) => Promise<IBookList>;
  addToFavorite: (params: TUserIdBookId) => Promise<void>;
  removeFromFavorite: (params: TUserIdBookId) => Promise<void>;
  fetchFavoriteBooks: (userId: number) => Promise<IBook[]>;
  fetchBookById: (params: TUserIdBookId) => Promise<IBook>;
  fetchBooksByStatuses: (params: TUserIdStatuses) => Promise<IBook[]>;

  changeBookStatus: (params: TChangeStatus) => Promise<void>;
  resetBookStatus: (params: TUserIdBookId) => Promise<void>;
};
