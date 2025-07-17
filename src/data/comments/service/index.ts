import { TCommentsService, TCommentsPaginationParams, TCommentsPaginationResult } from './types';
import { TCommentsRepository } from '../repository/types';
import { TComment, TCommentWithUser, TCreateCommentParams } from '../enitites/types';
import { Comment } from '../enitites/Comment';
import { TUsersRepository } from '@/data/users/repository/types';

export class CommentsService implements TCommentsService {
  constructor(private repository: TCommentsRepository, private usersRepository: TUsersRepository) {
    this.repository = repository;
    this.usersRepository = usersRepository;
  }

  async getBookComments(bookProviderId: string, params?: TCommentsPaginationParams): Promise<TCommentsPaginationResult> {
    const result = await this.repository.getComments(bookProviderId, params);

    // Create Comment instances with user data
    const comments = result.comments.map(commentData =>
      new Comment(commentData, commentData.user)
    );

    // Build the comment tree structure (parent-child relationships)
    const treeComments = this.buildCommentTree(comments);

    return {
      comments: treeComments,
      totalCount: result.totalCount,
      hasMore: result.hasMore,
      nextPage: result.nextPage,
    };
  }

  async getCommentCount(bookProviderId: string): Promise<number> {
    return this.repository.getCommentCount(bookProviderId);
  }

  async createComment(params: TCreateCommentParams): Promise<TCommentWithUser> {
    const comment = await this.repository.createComment(params);
    const user = await this.usersRepository.getUserById(comment.user_id);
    return new Comment(comment, user);
  }

  private buildCommentTree(comments: TComment[]): TComment[] {
    const commentMap = new Map<number, TComment>();
    const rootComments: TComment[] = [];

    // First pass: create a map of all comments
    comments.forEach(comment => {
      commentMap.set(comment.id, comment);
    });

    // Second pass: build parent-child relationships
    comments.forEach(comment => {
      if (comment.parent_id === null) {
        // This is a root comment
        rootComments.push(comment);
      } else {
        // This is a child comment
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.children.push(comment);
        }
      }
    });

    return rootComments;
  }
}
