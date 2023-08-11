import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import commentsRouter from './comments';
import { forumRouter } from './forum';
import topicsRouter from './forumTopic';
import { reactionRouter } from './reaction';
import repliesRouter from './replies';
import { Routes } from './types';

const router = Router();

router.use('/api/' + Routes.Forum, authMiddleware, forumRouter);
router.use('/api/' + Routes.ForumTopics, authMiddleware, topicsRouter);
router.use('/api/' + Routes.Comments, authMiddleware, commentsRouter);
router.use('/api/' + Routes.Replies, authMiddleware, repliesRouter);
router.use('/api/' + Routes.Reaction, authMiddleware, reactionRouter);

export default router;
