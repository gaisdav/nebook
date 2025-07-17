import {bookService} from '@/data/books/index.ts';

export const fetchBookByIdQueryKey = (bookId: string) => [fetchBookByIdQueryKey.name, bookId];

export const fetchBookByIdQueryOptions = (bookId: string, userId: number) => {
  return {
    queryKey: fetchBookByIdQueryKey(bookId),
    queryFn: () => bookService.fetchBookById({ bookId, userId }),
  };
};
