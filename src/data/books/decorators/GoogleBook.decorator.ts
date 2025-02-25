import {IBook} from '@/data/books/enitites/book/types.ts';
import {BookEntity} from '@/data/books/enitites/book/BookEntity.ts';
import {TGoogleBook} from '@/data/books/store/types.ts';

export class GoogleBook extends BookEntity implements IBook {
  constructor(info: TGoogleBook & {status?: number; isFavorite?: boolean}) {
    super({
      id: info.id,
      title: info.volumeInfo.title || '',
      subtitle: info.volumeInfo.subtitle || '',
      authors: info.volumeInfo.authors || [],
      publisher: info.volumeInfo.publisher || '',
      description: info.volumeInfo.description || '',
      publishedDate: info.volumeInfo.publishedDate,
      cover: info.volumeInfo.imageLinks?.thumbnail?.replace(
        'http://',
        'https://',
      ),
      categories: info.volumeInfo.categories || [],
      language: info.volumeInfo.language,
      pageCount: info.volumeInfo.pageCount,
      status: info.status || null,
      isFavorite: info.isFavorite,
    });
  }
}
