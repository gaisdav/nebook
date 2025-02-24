import {IBook} from '@/data/books/enitites/book/types.ts';
import {BookEntity} from '@/data/books/enitites/book/BookEntity.ts';
import {IBookList, TGoogleBookSearch} from '@/data/books/store/types.ts';

export class GoogleBookItems implements IBookList {
  totalItems: number = 0;
  items: Map<string, IBook> = new Map();
  limit: number = 0;
  page: number = 0;

  constructor(
    info: {totalItems: number} & TGoogleBookSearch,
    limit: number,
    page: number,
  ) {
    this.limit = limit;
    this.page = page;
    this.totalItems = info.totalItems;

    info.items?.forEach(book => {
      this.items.set(
        book.id,
        new BookEntity({
          id: book.id,
          publishedDate: book.volumeInfo.publishedDate,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          authors: book.volumeInfo.authors,
          categories: book.volumeInfo.categories,
          cover: book.volumeInfo.imageLinks?.thumbnail,
          description: book.volumeInfo.description,
          language: book.volumeInfo.language,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
        }),
      );
    });
  }
}
