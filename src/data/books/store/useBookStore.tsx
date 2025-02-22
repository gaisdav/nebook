import {create} from 'zustand/index';
import {BooksService} from '@/data/books/services/BooksService.ts';
import {BooksActions, BooksState} from '@/data/books/store/types.ts';
import {supabase} from '@/lib/supabase.config.ts';
import {BooksRepository} from '@/data/books/repository/BooksRepository.ts';
import {getErrorMessage} from '@/lib/utils.ts';

const initialState: BooksState = {
  bookLoading: false,
  listLoading: false,
  collectionLoading: false,
  favoriteLoading: false,
  statusLoading: false,
  list: null,
  book: null,
  collection: new Map(),
  favoriteBooks: new Map(),
  errors: {},
};

const booksRepository = new BooksRepository(supabase);
const bookService = new BooksService(booksRepository);

export const useBookStore = create<BooksState & BooksActions>((set, get) => ({
  ...initialState,

  resetBook: () => set({book: null}),
  resetList: () => set({list: null}),
  resetAll: () => set(initialState),

  fetchFirstList: async params => {
    set(() => ({listLoading: true}));
    try {
      const books = await bookService.searchBooks(params);
      set({list: books});
    } catch (error) {
      set({errors: {...get().errors, listError: getErrorMessage(error)}});
      throw error;
    } finally {
      set({listLoading: false});
    }
  },

  fetchPaginatedList: async params => {
    set(() => ({listLoading: true}));
    try {
      const books = await bookService.searchBooks(params);
      set(({list}) => ({
        list: {
          ...books,
          items: list?.items
            ? [
                ...list.items,
                ...(books.items || []).filter(
                  item =>
                    !list.items?.some(prevItem => prevItem.id === item.id),
                ),
              ]
            : books.items,
        },
      }));
    } catch (error) {
      set({errors: {...get().errors, listError: getErrorMessage(error)}});
      throw error;
    } finally {
      set({listLoading: false});
    }
  },

  fetchBook: async params => {
    set(() => ({bookLoading: true}));
    try {
      const book = await bookService.fetchBookById(params);
      set({book});
    } catch (error) {
      set({errors: {...get().errors, bookError: getErrorMessage(error)}});
      throw error;
    } finally {
      set({bookLoading: false});
    }
  },

  fetchBooksByStatuses: async params => {
    set(() => ({collectionLoading: true}));
    try {
      const books = await bookService.fetchBooksByStatuses(params);
      set({collection: new Map(books.map(book => [book.id, book]))});
    } catch (error) {
      set({errors: {...get().errors, bookError: getErrorMessage(error)}});
      throw error;
    } finally {
      set({collectionLoading: false});
    }
  },

  addToFavorite: async params => {
    set(() => ({favoriteLoading: true}));
    try {
      await bookService.addToFavorite(params);
      const favoriteBook = await bookService.fetchBookById(params);

      const favoriteBooks = get().favoriteBooks;
      favoriteBooks.set(favoriteBook.id, favoriteBook);
      set({
        favoriteBooks,
        book: favoriteBook,
      });
    } catch (error) {
      set({
        errors: {...get().errors, favoriteError: getErrorMessage(error)},
      });
      throw error;
    } finally {
      set({favoriteLoading: false});
    }
  },

  removeFromFavorite: async params => {
    set(() => ({favoriteLoading: true}));
    try {
      await bookService.removeFromFavorite(params);
      const updatedBook = await bookService.fetchBookById(params);

      const favoriteBooks = get().favoriteBooks;
      favoriteBooks.delete(params.bookId);

      set({
        favoriteBooks,
        book: updatedBook,
      });
    } catch (error) {
      set({
        errors: {...get().errors, favoriteError: getErrorMessage(error)},
      });
      throw error;
    } finally {
      set({favoriteLoading: false});
    }
  },

  getFavoriteBooks: async userId => {
    set({favoriteLoading: true});
    try {
      const books = await bookService.fetchFavoriteBooks(userId);
      set({favoriteBooks: new Map(books.map(book => [book.id, book]))});
    } catch (error) {
      set({
        errors: {...get().errors, favoriteError: getErrorMessage(error)},
      });
      throw error;
    } finally {
      set({favoriteLoading: false});
    }
  },

  changeBookStatus: async params => {
    set(() => ({statusLoading: true}));
    try {
      await bookService.changeBookStatus(params);
      const book = await bookService.fetchBookById(params);
      set({book});
    } catch (error) {
      set({errors: {...get().errors, bookError: getErrorMessage(error)}});
      throw error;
    } finally {
      set({statusLoading: false});
    }
  },

  resetBookStatus: async params => {
    set(() => ({statusLoading: true}));
    try {
      await bookService.resetBookStatus(params);
      const book = await bookService.fetchBookById(params);
      set({book});
    } catch (error) {
      set({errors: {...get().errors, bookError: getErrorMessage(error)}});
      throw error;
    } finally {
      set({statusLoading: false});
    }
  },
}));
