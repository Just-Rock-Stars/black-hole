import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

import { TUserDto } from '../dtos/userDto';

interface ICustomRequest extends Request {
  user?: TUserDto;
}

export const authMiddleware = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }

  try {
    const response = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        cookie: req.headers.cookie,
      },
    });

    if (response.data) {
      req.user = response.data;
    }

    next();
  } catch (error) {
    console.error('You are not authorized', error);
    res.status(401).json({ error: 'You are not authorized' });
  }
};
