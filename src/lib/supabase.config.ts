import {createClient} from '@supabase/supabase-js';
import {Database} from '@/database.types.ts';
import {BOOK_SUPABASE_URL, BOOK_SUPABASE_ANON_KEY} from '@env';

if (!BOOK_SUPABASE_URL || !BOOK_SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createClient<Database>(
  BOOK_SUPABASE_URL.toString(),
  BOOK_SUPABASE_ANON_KEY.toString(),
);
