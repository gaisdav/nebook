import {TCacheNames} from '@/lib/cache/types.ts';
import {TUserIdBookId, TUserIdStatuses} from '@/data/books/types.ts';

export const cacheKeys: Record<TCacheNames, any> = {
  /**
   * Books cache keys
   */
  books: {
    list: 'books-list',
    book: (id: string) => `book-${id}`,
  },
  /**
   * Users cache keys
   */
  users: {},
  profile: {},
  reviews: {},
  /**
   * Favorite books cache keys
   */
  favoriteBooks: {
    favoriteBooksData: (userId: number) => `user-${userId}`,
    favoriteBookData: ({userId, bookId}: TUserIdBookId) =>
      `user-${userId}-book-${bookId}`,
  },
  /**
   * Books statuses cache keys
   */
  booksStatuses: {
    bookStatusData: ({userId, bookId}: TUserIdBookId) =>
      `user-${userId}-book-${bookId}`,
    booksStatusesData: ({statuses, userId}: TUserIdStatuses) =>
      `user-${userId}-statuses-${statuses.join('-')}`,
  },
  /**
   * Theme cache keys
   */
  theme: {
    preference: 'theme-preference',
  },
  /**
   * Auth cache keys
   */
  auth: {},
};
