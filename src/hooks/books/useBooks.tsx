import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {
  fetchBookByIdQueryOptions,
  fetchFavoriteBookByBookIdAndUserIdQueryOptions,
  fetchBookStatusByBookIdAndUserIdQueryOptions,
} from '@/data/books';
import {IBook} from '@/data/books/enitites/book/types';
import {BookEntity} from '@/data/books/enitites/book/BookEntity';
import {fetchBooksQueryOptions} from '@/data/books/fetchBooksQueryOptions';
import {IBookList, TGoogleBookSearch} from '@/data/books/store/types';
import {GoogleBookItems} from '@/data/books/decorators/GoogleBooks.decorator';

export type UseBookParams = {
  bookId?: string;
  userId?: string;
  fetchList?: boolean;
  fetchBook?: boolean;
  fetchFavorite?: boolean;
  fetchStatus?: boolean;
  query?: string;
};

export const useBook = (
  params: UseBookParams,
): {
  book: IBook;
  isBookLoading: boolean;
  bookError: Error | null;
  books: IBookList;
  isBooksLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
} => {
  const {
    bookId = '',
    userId = '',
    fetchList,
    fetchBook,
    fetchFavorite,
    fetchStatus,
    query = '',
  } = params;

  const {data: status, isLoading: isStatusLoading} = useQuery({
    ...fetchBookStatusByBookIdAndUserIdQueryOptions(bookId, userId),
    enabled: !!bookId && !!userId && fetchStatus,
  });

  const {data: favoriteBookId, isLoading: isFavoriteLoading} = useQuery({
    ...fetchFavoriteBookByBookIdAndUserIdQueryOptions(bookId, userId),
    enabled: !!bookId && !!userId && fetchFavorite,
  });

  const {data, isLoading, error} = useQuery({
    ...fetchBookByIdQueryOptions(bookId),
    enabled: !!bookId && !isStatusLoading && !isFavoriteLoading && fetchBook,
  });

  // TODO доработать запросы
  const {
    data: _books,
    isLoading: isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<TGoogleBookSearch, Error, TGoogleBookSearch>({
    ...fetchBooksQueryOptions({
      query,
      page: 1,
      limit: 10,
    }),
    enabled: fetchList,
    getNextPageParam: (lastPage, pages) => lastPage.items.length + 1,
    initialPageParam: 1,
  });

  const book: IBook = new BookEntity({
    id: data?.id || '',
    title: data?.volumeInfo.title || '',
    subtitle: data?.volumeInfo.subtitle || '',
    authors: data?.volumeInfo.authors || [],
    publisher: data?.volumeInfo.publisher || '',
    description: data?.volumeInfo.description || '',
    publishedDate: data?.volumeInfo.publishedDate,
    cover: data?.volumeInfo.imageLinks?.thumbnail?.replace(
      'http://',
      'https://',
    ),
    categories: data?.volumeInfo.categories || [],
    language: data?.volumeInfo.language,
    pageCount: data?.volumeInfo.pageCount,
    status,
    isFavorite: Boolean(favoriteBookId),
  });

  const books = new GoogleBookItems(
    _books || {totalItems: 0, items: []},
    10,
    1,
  );

  return {
    book,
    isBookLoading: isLoading,
    bookError: error,
    books,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  };
};
