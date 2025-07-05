import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  fetchBookByIdQueryOptions,
  fetchFavoriteBookByBookIdAndUserIdQueryOptions,
  fetchBookStatusByBookIdAndUserIdQueryOptions,
} from '@/data/books';
import {IBook} from '@/data/books/enitites/book/types';
import {BookEntity} from '@/data/books/enitites/book/BookEntity';
import {fetchBooksQueryOptions} from '@/data/books/fetchBooksQueryOptions';
import {TGoogleBookSearch} from '@/data/books/store/types';
import {GoogleBookItems} from '@/data/books/decorators/GoogleBooks.decorator';

export type UseBookParams = {
  bookId?: string;
  userId?: number;
  fetchList?: boolean;
  fetchBook?: boolean;
  fetchFavorite?: boolean;
  fetchStatus?: boolean;
  query?: string;
};

export const useBook = (params: UseBookParams) => {
  const {
    bookId = '',
    userId = 0,
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

  const {
    data: _books,
    isLoading: isBooksLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...fetchBooksQueryOptions({
      query,
      page: 1,
      limit: 10,
    }),
    placeholderData: keepPreviousData,
    enabled: fetchList,
    getNextPageParam: (lastPage: TGoogleBookSearch) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.nextPage;
    },
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

  const books = _books
    ? new GoogleBookItems(_books)
    : {
        totalItems: 0,
        items: new Map(),
      };

  return {
    book,
    isBookLoading: isLoading,
    bookError: error,
    books,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
