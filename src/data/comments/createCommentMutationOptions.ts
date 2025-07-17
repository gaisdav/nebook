import { TCreateCommentParams } from "./enitites/types";
import { CommentsService } from "./service";
import { CommentsRepository } from "./repository/CommentsRepository";
import { supabase } from "@/lib/supabase.config";
import { UsersRepository } from "@/data/users/repository/UsersRepository";

const commentsRepository = new CommentsRepository(supabase);
const usersRepository = new UsersRepository(supabase);
const commentsService = new CommentsService(commentsRepository, usersRepository);

export const createCommentMutationOptionsKey = (
  bookId: string,
  userId: number,
) => [createCommentMutationOptions.name, bookId, userId];

export const createCommentMutationOptions = (
  bookId: string,
  userId: number,
) => {
  return {
    mutationKey: createCommentMutationOptionsKey(bookId, userId),
    mutationFn: (params: TCreateCommentParams) => commentsService.createComment(params),
  };
};
