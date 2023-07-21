import { RequestHandler } from 'express';

import { TCommentDto } from '../dtos/commentDto';
import { TPostCommentDto } from '../dtos/postCommentDto';
import { ICommentsServices } from '../services/commentsService';

export interface ICommentsController {
  post: RequestHandler<TPostCommentDto, TCommentDto>;
}

export class CommentsController implements ICommentsController {
  constructor(private _commentsService: ICommentsServices) {}

  post: RequestHandler<TPostCommentDto, TCommentDto> = async (req, res) => {
    const comment = await this._commentsService.createComment(req.body);

    res.send(comment);
  };
}
