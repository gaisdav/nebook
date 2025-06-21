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

  return books;
};

export const fetchBooksQueryKey = (params: TGoogleBookSearchParams) => [
  fetchBooksQueryKey.name,
  params.query,
  params.page,
  params.limit,
];

export const fetchBooksQueryOptions = (params: TGoogleBookSearchParams) => {
  return {
    queryKey: fetchBooksQueryKey(params),
    queryFn: () => fetchBooks(params),
  };
}; 