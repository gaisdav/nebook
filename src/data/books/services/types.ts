import {
  TGoogleBookSearchParams,
  TUserIdBookId,
  TUserIdStatuses,
  TChangeStatus,
} from '../types';
import {IBook} from '@/data/books/enitites/book/types';
import {IBookList} from '@/data/books/store/types';

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
