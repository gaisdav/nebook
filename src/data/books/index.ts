import {BooksRepository} from '@/data/books/repository/BooksRepository.ts';
import {supabase} from '@/lib/supabase.config.ts';
import {BooksService} from '@/data/books/services/BooksService.ts';

export * from './fetchBookByIdQueryOptions';
export * from './fetchFavoriteBookByBookIdAndUserIdQueryOptions';
export * from './fetchBookStatusByBookIdAndUserIdQueryOptions';

export const bookRepository = new BooksRepository(supabase);
export const bookService = new BooksService(bookRepository);
