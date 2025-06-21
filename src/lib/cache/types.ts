export type TCacheNames =
  | 'books'
  | 'profile'
  | 'reviews'
  | 'users'
  | 'favoriteBooks'
  | 'booksStatuses'
  | 'theme';

export interface CacheOptions {
  ttl?: number | null; // Время жизни данных в миллисекундах (опционально)
}

export interface ICacheService {
  set<T>(
    storeName: TCacheNames,
    key: string,
    value: T,
    options?: CacheOptions,
  ): void;
  get<T>(storeName: TCacheNames, key: string): T | null;
  delete(storeName: TCacheNames, key: string): void;
  clear(storeName: TCacheNames): void;
}
