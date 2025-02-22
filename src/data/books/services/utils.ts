import {BOOK_GOOGLE_API_KEY} from '@env';

export const constructGoogleBooksUrl = (
  query: string,
  limit: number,
  page: number,
): string => {
  const url = new URL('https://www.googleapis.com/books/v1/volumes');
  url.search = new URLSearchParams({
    key: BOOK_GOOGLE_API_KEY.toString(),
    q: query,
    maxResults: limit.toString(),
    startIndex: ((page - 1) * limit).toString(),
  }).toString();
  return url.toString();
};

export const constructGoogleBookUrl = (bookId: string): string => {
  const url = new URL(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
  url.search = new URLSearchParams({
    key: BOOK_GOOGLE_API_KEY.toString(),
  }).toString();

  return url.toString();
};
