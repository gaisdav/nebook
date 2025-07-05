export type TCacheNames =
  | 'auth'
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
  setItem<T>(
    storeName: TCacheNames,
    key: string,
    value: T,
    options?: CacheOptions,
  ): void;
  getItem<T>(storeName: TCacheNames, key: string): T | null;
  removeItem(storeName: TCacheNames, key: string): void;
  clear(storeName: TCacheNames): void;
}
