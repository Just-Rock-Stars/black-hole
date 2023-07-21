import { Router } from 'express';

import { forumRouter } from './forum';
import topicsRouter from './forumTopic';
import { Routes } from './types';

const router = Router();

router.use('/' + Routes.Forum, forumRouter);
router.use('/' + Routes.ForumTopics, topicsRouter);

export default router;
