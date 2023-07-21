import { Request, Response } from 'express';

import { AppError } from './errors';

export function errorsHandler(error: AppError, _request: Request, res: Response) {
  res.header('Content-Type', 'application/json');

  const { status, message } = error;

  res.status(status).send(message);
}
