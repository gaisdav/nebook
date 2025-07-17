import { TUser } from '@/data/users/enitites/types';
import { TComment, TDBComment } from './types';

export class Comment implements TComment {
    id: number;
    book_provider_id: string;
    content: string;
    created_at: string | null;
    parent_id: number | null;
    updated_at: string | null;
    user_id: number;
    user: TUser;
    children: TComment[];

    constructor(data: TDBComment, user: TUser) {
        this.id = data.id;
        this.book_provider_id = data.book_provider_id;
        this.content = data.content;
        this.created_at = data.created_at;
        this.parent_id = data.parent_id;
        this.updated_at = data.updated_at;
        this.user_id = data.user_id;
        this.user = user;
        this.children = [];
    }
}