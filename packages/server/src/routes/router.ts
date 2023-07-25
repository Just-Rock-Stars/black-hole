import { Router } from 'express';

import commentsRouter from './comments';
import { forumRouter } from './forum';
import topicsRouter from './forumTopic';
import { reactionRouter } from './reaction';
import repliesRouter from './replies';
import { Routes } from './types';

const router = Router();

router.use('/api/' + Routes.Forum, forumRouter);
router.use('/api/' + Routes.ForumTopics, topicsRouter);
router.use('/api/' + Routes.Comments, commentsRouter);
router.use('/api/' + Routes.Replies, repliesRouter);
router.use('/api/' + Routes.Reaction, reactionRouter);

export default router;
