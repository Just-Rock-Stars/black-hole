import { NextFunction, Request, Response } from 'express';

import { AppError } from './errors';

export function errorsHandler(
  error: AppError,
  _request: Request,
  res: Response,
  _next: NextFunction
) {
  res.set('Content-Type', 'application/json');
  const { status, message } = error;
  res.status(status).send(message);
}
