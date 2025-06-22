import { TGoogleBookSearchParams } from './types';
import { constructGoogleBooksUrl } from './services/utils';
import { TGoogleBookSearch } from './store/types';

export const fetchBooks = async (params: TGoogleBookSearchParams): Promise<TGoogleBookSearch> => {
  const { query = '', limit = 10, page = 1 } = params;

  const url = constructGoogleBooksUrl(query, limit, page);
  const result = await fetch(url.toString());
  
  if (!result.ok) {
    const error = await result.text();
    throw new Error(error);
  }
  
  const books = await result.json();

  return {
    ...books,
    nextPage: page + 1,
    hasMore: books.items.length === limit,
  };
};

export const fetchBooksQueryKey = (params: Required<TGoogleBookSearchParams>) => [
  fetchBooksQueryKey.name,
  params.query,
  params.page.toString(),
  params.limit.toString(),
];

export const fetchBooksQueryOptions = (params: TGoogleBookSearchParams) => {
  const { query = '', limit = 10, page = 1 } = params;
  return {
    queryKey: fetchBooksQueryKey({query, limit, page}),
    queryFn: ({pageParam}: {pageParam: number}) => {
      return fetchBooks({query, limit, page: pageParam});
    },
    
  };
}; 