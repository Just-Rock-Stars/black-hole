import { Router } from 'express';

import { ReactionController } from '../controllers/reaction';
import { ReactionService } from '../services/reactionService';

export const reactionRouter = Router();

const controller = new ReactionController(new ReactionService());

reactionRouter.get('/', controller.getReactionByTopicId);
reactionRouter.post('/', controller.create);
reactionRouter.delete('/', controller.destroyReaction);
