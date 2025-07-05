import 'react-native-url-polyfill/auto';

import { createClient, processLock } from '@supabase/supabase-js';
import { Database } from '@/database.types.ts';
import { BOOK_SUPABASE_URL, BOOK_SUPABASE_ANON_KEY } from '@env';
import { AppState } from 'react-native';
import { cache } from '@/lib/cache/CacheService.ts';

if (!BOOK_SUPABASE_URL || !BOOK_SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL and Anon Key are required');
}

class Storage {
  constructor(private readonly storeName: 'auth') { }

  getItem(key: string): string | null {
    return cache.getItem(this.storeName, key);
  }

  setItem(key: string, value: string) {
    cache.setItem<string>(this.storeName, key, value);
  }

  removeItem(key: string) {
    cache.removeItem(this.storeName, key);
  }
}

export const supabase = createClient<Database>(
  BOOK_SUPABASE_URL.toString(),
  BOOK_SUPABASE_ANON_KEY.toString(), {
  auth: {
    storage: new Storage('auth'),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
}
);

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
