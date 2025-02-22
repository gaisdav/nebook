import { IBook } from './types.ts';

export class BookEntity implements IBook {
  id: string;
  title: string;
  subtitle: string;
  authors: string[] = [];
  publisher?: string;
  description?: string;
  publishedDate?: string;
  cover?: string;
  categories?: string[];
  language?: string;
  pageCount?: number;
  status: number | null;
  isFavorite?: boolean = false;

  constructor(bookInfo: IBook) {
    this.id = bookInfo.id;
    this.title = bookInfo.title || '';
    this.subtitle = bookInfo.subtitle || '';
    this.authors = bookInfo.authors || [];
    this.publisher = bookInfo.publisher || '';
    this.description = bookInfo.description || '';
    this.publishedDate = bookInfo.publishedDate;
    this.cover = bookInfo.cover || '';
    this.categories = bookInfo.categories || [];
    this.language = bookInfo.language;
    this.pageCount = bookInfo.pageCount;

    this.status = bookInfo.status || null;
    this.isFavorite = bookInfo.isFavorite;
  }
}
