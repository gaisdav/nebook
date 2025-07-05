import {Database} from '@/database.types.ts';

export interface IBook {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher?: string;
  description?: string;
  publishedDate?: string;
  cover?: string;
  categories?: string[];
  language?: string;
  pageCount?: number;
  status?: TBookStatus | null;
  isFavorite?: boolean;
}

export type TBookStatus = Database['public']['Enums']['book_status']
