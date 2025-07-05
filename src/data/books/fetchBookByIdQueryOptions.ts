import { TGoogleBook } from './store/types';
import { cacheKeys } from '@/lib/cache/constants';
import { constructGoogleBookUrl } from './services/utils';
import { cache } from '@/lib/cache/CacheService';

export const fetchBookById = async (bookId: string): Promise<TGoogleBook> =>  {
    const cacheKey = cacheKeys.books.book(bookId);
    const cachedBook = await cache.getItem<TGoogleBook>('books', cacheKey);

    if (cachedBook) {
      return cachedBook;
    }

    const url = constructGoogleBookUrl(bookId);
    const result = await fetch(url);
    const book = await result.json();

    await cache.setItem('books', cacheKey, book, {ttl: 1000 * 60 * 2}); // 2 minutes

  return book;
};

export const fetchBookByIdQueryKey = (bookId: string) => [fetchBookByIdQueryOptions.name, bookId];

export const fetchBookByIdQueryOptions = (bookId: string) => {
  return {
    queryKey: fetchBookByIdQueryKey(bookId),
    queryFn: () => fetchBookById(bookId),
  };
};
