import {
  TUserIdBookId,
  TChangeStatus,
  TGoogleBookSearchParams,
  TUserIdStatuses,
} from '@/data/books/types';
import { TGoogleBook, TGoogleBookSearch } from '@/data/books/store/types.ts';

export type TBooksRepository = {
  fetchBookById(bookId: string): Promise<TGoogleBook>;
  fetchBooks(params: TGoogleBookSearchParams): Promise<TGoogleBookSearch>;
  fetchBooksDataByStatuses(params: TUserIdStatuses): Promise<string[]>;
  addToFavorite(params: TUserIdBookId): Promise<void>;
  removeFromFavorite(params: TUserIdBookId): Promise<void>;
  fetchFavoriteBookData(params: TUserIdBookId): Promise<string | null>;
  getFavoriteBooksData(userId: string): Promise<string[]>;

  changeBookStatus(params: TChangeStatus): Promise<void>;
  fetchBookStatus(params: TUserIdBookId): Promise<number | null>;
  resetBookStatus(params: TUserIdBookId): Promise<void>;
};
