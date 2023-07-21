import { RequestHandler } from 'express';

import { TCreateTopicDto } from '../dtos/createTopicDto';
import { TTopicDto } from '../dtos/topicDto';
import { ITopicService } from '../services/topicsService';

export interface ITopicController {
  create: RequestHandler<void, TTopicDto, TCreateTopicDto>;
  getByForumId: RequestHandler<{ id: number }, TTopicDto[]>;
}

export class TopicController implements ITopicController {
  constructor(private topicService: ITopicService) {}

  create: RequestHandler<void, TTopicDto, TCreateTopicDto> = async (req, res) => {
    const result = await this.topicService.createTopic(req.body);

    res.send(result);
  };

  getByForumId: RequestHandler<{ id: number }, TTopicDto[], void> = async (req, res) => {
    const result = await this.topicService.getAllTopicsByForumId(req.params.id);

    res.send(result);
  };
}
