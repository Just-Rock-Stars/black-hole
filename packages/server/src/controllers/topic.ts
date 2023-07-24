import { RequestHandler } from 'express';

import { TCreateTopicDto } from '../dtos/createTopicDto';
import { TTopicDto } from '../dtos/topicDto';
import { ITopicService } from '../services/topicsService';

export interface ITopicController {
  create: RequestHandler<void, TTopicDto, TCreateTopicDto>;
  getByForumId: RequestHandler<void, TTopicDto[], void, { forumId: number }>;
}

export class TopicController implements ITopicController {
  constructor(private topicService: ITopicService) {}

  create: RequestHandler<void, TTopicDto, TCreateTopicDto> = async (req, res, next) => {
    try {
      const result = await this.topicService.createTopic(req.body);

      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  getByForumId: RequestHandler<void, TTopicDto[], void, { forumId: number }> = async (
    req,
    res,
    next
  ) => {
    try {
      const result = await this.topicService.getAllTopicsByForumId(req.query.forumId);

      res.send(result);
    } catch (error) {
      next(error);
    }
  };
}
