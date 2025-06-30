import type { Request, Response, NextFunction } from 'express';
import logger from './logger.ts';

export const errorHandler = (
	error: any, // <-- change to any to access error.code
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error('Error object:', error);

	logger.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	} else if (
		(error.name === 'MongoServerError' &&
			error.message.includes('E11000 duplicate key error')) ||
		error.code === 11000
	) {
		return res.status(400).json({ error: 'expected `username` to be unique' });
	}

	res.status(500).json({ error: 'internal server error' });
};
