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
  status?: number | null;
  isFavorite?: boolean;
}

export type TBookStatus = 'read' | 'reading' | 'want-to-read';
