import {IBook} from '@/data/books/enitites/book/types.ts';
import {BookEntity} from '@/data/books/enitites/book/BookEntity.ts';
import {IBookList, TGoogleBookSearch} from '@/data/books/store/types.ts';
import { InfiniteData } from '@tanstack/react-query';

export class GoogleBookItems implements IBookList {
  totalItems: number = 0;
  items: Map<string, IBook> = new Map();

  constructor(info: InfiniteData<TGoogleBookSearch, unknown>) {
    this.totalItems = info.pages[0].totalItems;

    info.pages.forEach(page => {
      page.items.forEach(book => {
        this.items.set(
          book.id,
        new BookEntity({
          id: book.id,
          publishedDate: book.volumeInfo.publishedDate,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          authors: book.volumeInfo.authors,
          categories: book.volumeInfo.categories,
          cover: book.volumeInfo.imageLinks?.thumbnail?.replace(
            'http://',
            'https://',
          ),
          description: book.volumeInfo.description,
          language: book.volumeInfo.language,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          }),
        );
      });
    });
  }
}
