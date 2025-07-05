import {TBookStatus} from '@/data/books/enitites/book/types.ts';

export const BookStatuses: Record<TBookStatus, {
    value: TBookStatus,
    label: string,
}> = {
    'reading': {
        value: 'reading',
        label: 'Reading',
    },
    'want-to-read': {
        value: 'want-to-read',
        label: 'Want to Read',
    },
    'read': {
        value: 'read',
        label: 'Read',
    },
};
