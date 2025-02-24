import {SupabaseClient} from '@supabase/supabase-js';
import {Database} from '@/database.types.ts';
import {cache} from '@/lib/cache/CacheService.ts';
import {
  TUserIdBookId,
  TChangeStatus,
  TGoogleBookSearchParams,
  TUserIdStatuses,
} from '@/data/books/services/types.ts';
import {TBooksRepository} from '@/data/books/repository/types.ts';
import {
  constructGoogleBooksUrl,
  constructGoogleBookUrl,
} from '@/data/books/services/utils.ts';
import {TGoogleBook, TGoogleBookSearch} from '@/data/books/store/types.ts';
import {cacheKeys} from '@/lib/cache/constants';

export class BooksRepository implements TBooksRepository {
  constructor(private repository: SupabaseClient<Database>) {}

  async fetchBookById(bookId: string): Promise<TGoogleBook> {
    const cacheKey = cacheKeys.books.book(bookId);
    const cachedBook = await cache.get<TGoogleBook>('books', cacheKey);

    if (cachedBook) {
      return cachedBook;
    }

    const url = constructGoogleBookUrl(bookId);
    const result = await fetch(url);
    const book = await result.json();

    await cache.set('books', cacheKey, book, {ttl: 1000 * 60 * 60 * 24});

    return book;
  }

  async fetchBooks(
    params: TGoogleBookSearchParams,
  ): Promise<TGoogleBookSearch> {
    const {query = '', limit = 10, page = 1} = params;
    const url = constructGoogleBooksUrl(query, limit, page);
    const result = await fetch(url.toString());
    if (!result.ok) {
      const error = await result.text();
      throw new Error(error);
    }
    return await result.json();
  }

  async fetchBooksDataByStatuses(params: TUserIdStatuses): Promise<string[]> {
    const cacheKey = cacheKeys.booksStatuses.booksStatusesData(params);
    const cachedBooks = await cache.get<string[]>('booksStatuses', cacheKey);

    if (cachedBooks) {
      return cachedBooks;
    }

    const {data, error} = await this.repository
      .from('user_books')
      .select('book_provider_id')
      .in('status_id', params.statuses)
      .eq('user_id', params.userId);

    if (error) {
      throw new Error(error.message);
    }

    const bookIds = data.map(book => book.book_provider_id);

    await cache.set('booksStatuses', cacheKey, bookIds, {
      ttl: 1000 * 60 * 60 * 24,
    });

    return bookIds;
  }

  async addToFavorite(params: TUserIdBookId): Promise<void> {
    await cache.clear('favoriteBooks');

    await this.repository.from('favorite_books').insert({
      user_id: params.userId,
      book_provider_id: params.bookId,
    });
  }

  async removeFromFavorite(params: TUserIdBookId): Promise<void> {
    await cache.clear('favoriteBooks');

    await this.repository
      .from('favorite_books')
      .delete()
      .eq('user_id', params.userId)
      .eq('book_provider_id', params.bookId);
  }

  async fetchFavoriteBookData({
    userId,
    bookId,
  }: TUserIdBookId): Promise<string | null> {
    const cacheKey = cacheKeys.favoriteBooks.favoriteBookData({
      userId,
      bookId,
    });
    const cachedBook = await cache.get<string>('favoriteBooks', cacheKey);

    if (cachedBook) {
      return cachedBook;
    }

    const {data, error} = await this.repository
      .from('favorite_books')
      .select('id, user_id, book_provider_id')
      .eq('user_id', userId)
      .eq('book_provider_id', bookId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    const bookProviderId = data?.book_provider_id || null;

    await cache.set('favoriteBooks', cacheKey, bookProviderId, {
      ttl: 1000 * 60 * 60 * 24,
    });

    return bookProviderId;
  }

  async getFavoriteBooksData(userId: number): Promise<string[]> {
    const dbKey = 'favorite_books';
    const cacheKey = cacheKeys.favoriteBooks.favoriteBooksData(userId);
    const cachedBooks = await cache.get<string[]>('favoriteBooks', cacheKey);

    if (cachedBooks) {
      return cachedBooks;
    }

    const {data, error} = await this.repository
      .from(dbKey)
      .select('book_provider_id')
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    const bookIds = data.map(book => book.book_provider_id);

    await cache.set('favoriteBooks', cacheKey, bookIds, {
      ttl: 1000 * 60 * 60 * 24,
    });

    return bookIds;
  }

  async changeBookStatus(params: TChangeStatus): Promise<void> {
    await cache.clear('booksStatuses');

    const {error} = await this.repository.from('user_books').upsert(
      {
        user_id: params.userId,
        book_provider_id: params.bookId,
        status_id: params.status,
      },
      {onConflict: 'user_id, book_provider_id'}, // Ключи для проверки на дубликаты
    );

    if (error) {
      throw new Error(error.message);
    }
  }

  async fetchBookStatus(params: TUserIdBookId): Promise<number | null> {
    const cacheKey = cacheKeys.booksStatuses.bookStatusData(params);
    const cachedStatus = await cache.get<number | null>(
      'booksStatuses',
      cacheKey,
    );

    if (cachedStatus) {
      return cachedStatus;
    }

    const {data, error} = await this.repository
      .from('user_books')
      .select('status_id')
      .eq('user_id', params.userId)
      .eq('book_provider_id', params.bookId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    const status = data?.status_id || null;

    await cache.set('booksStatuses', cacheKey, status || null, {
      ttl: 1000 * 60 * 60 * 24,
    });

    return status;
  }

  async resetBookStatus(params: TUserIdBookId): Promise<void> {
    await cache.clear('booksStatuses');

    const {error} = await this.repository
      .from('user_books')
      .delete()
      .eq('user_id', params.userId)
      .eq('book_provider_id', params.bookId);

    if (error) {
      throw new Error(error.message);
    }
  }
}
