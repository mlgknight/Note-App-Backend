import 'dotenv/config';
import express from 'express';
import noteRouter from './routes/note.routes.ts';
import connectDB from '../config/database.ts';
import type { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;


// Connect to MongoDB
connectDB();
// middleware
app.use(express.json());
app.use(express.static('dist'));

app.use('/api/notes', noteRouter);
const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	res.status(500).json({ error: 'internal server error' });
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
