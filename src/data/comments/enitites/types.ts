import { TUser } from "@/data/users/enitites/types";
import { Database } from "@/database.types";

export type TCommentWithUser = TDBComment & {
    user: TUser;
};

export type TDBComment = Database['public']['Tables']['book_comments']['Row'];
export type TComment = TDBComment & {
    user: TUser;
    children: TComment[]
};

export type TCreateCommentParams = {
    bookId: string;
    userId: number;
    content: string;
    parentId?: number | null;
};

export type UseCreateCommentParams = {
    bookId: string;
    userId: number;
};