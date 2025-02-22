import {MMKV} from 'react-native-mmkv';
import {ICacheService, CacheOptions, TCacheNames} from '@/lib/cache/types.ts';

export const storage = new MMKV();

class CacheService implements ICacheService {
  private formatKey(storeName: TCacheNames, key: string): string {
    return `${storeName}:${key}`;
  }

  set<T>(
    storeName: TCacheNames,
    key: string,
    value: T,
    options: CacheOptions = {ttl: null},
  ) {
    const formattedKey = this.formatKey(storeName, key);
    const dataToStore = {
      value,
      timestamp: Date.now(),
      ttl: options.ttl ?? null,
    };

    storage.set(formattedKey, JSON.stringify(dataToStore));
  }

  get<T>(storeName: TCacheNames, key: string): T | null {
    const formattedKey = this.formatKey(storeName, key);
    const storedData = storage.getString(formattedKey);

    if (!storedData) {
      return null;
    }

    try {
      const {value, timestamp, ttl} = JSON.parse(storedData);
      if (ttl && Date.now() - timestamp > ttl) {
        this.delete(storeName, key);
        return null;
      }
      return value;
    } catch (error) {
      return null;
    }
  }

  delete(storeName: TCacheNames, key: string) {
    const formattedKey = this.formatKey(storeName, key);
    storage.delete(formattedKey);
  }

  clear(storeName: TCacheNames) {
    const allKeys = storage.getAllKeys();
    allKeys.forEach(key => {
      if (key.startsWith(`${storeName}:`)) {
        storage.delete(key);
      }
    });
  }
}

export const cache = new CacheService();
