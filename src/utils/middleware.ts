  import type { Request, Response, NextFunction } from 'express';
  import logger from './logger.ts';

  export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } else if (
      error.name === 'MongoServerError' &&
      error.message.includes('E11000 duplicate key error')
    ) {
      return res.status(400).json({
        error: 'expected `username` to be unique',
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'invalid token',
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'token expired',
      });
    }
    next(error);
  };
