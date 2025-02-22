import { IBook } from '@/data/books/enitites/book/types.ts';
import {
  TChangeStatus,
  TUserIdBookId,
  TGoogleBookSearchParams,
  TUserIdStatuses,
} from '@/data/books/services/types.ts';

export type TGoogleBook = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    language: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
};

export interface IBookList {
  totalItems: number;
  items: IBook[];
  limit: number;
  page: number;
}

export type TGoogleBookSearch = {
  totalItems: number;
  items: TGoogleBook[];
};

export interface BooksStateErrors {
  listError?: string | null;
  bookError?: string | null;
  favoriteError?: string | null;
}

export interface BooksState {
  listLoading: boolean;
  bookLoading: boolean;
  collectionLoading: boolean;
  favoriteLoading: boolean;
  statusLoading: boolean;
  list: IBookList | null;
  book: IBook | null;
  favoriteBooks: Map<string, IBook>;
  collection: Map<string, IBook>;
  errors: BooksStateErrors;
}

export interface BooksActions {
  resetBook: () => void;
  resetList: () => void;
  resetAll: () => void;
  fetchPaginatedList: (params: TGoogleBookSearchParams) => void;
  fetchFirstList: (params: TGoogleBookSearchParams) => void;
  fetchBook: (params: TUserIdBookId) => void;
  fetchBooksByStatuses: (params: TUserIdStatuses) => void;

  addToFavorite: (params: TUserIdBookId) => void;
  removeFromFavorite: (params: TUserIdBookId) => void;
  getFavoriteBooks: (userId: number) => void;

  changeBookStatus: (params: TChangeStatus) => void;
  resetBookStatus: (params: TUserIdBookId) => void;
}
