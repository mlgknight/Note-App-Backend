import './config/db';
import express from 'express';
import { contactRouter } from './routes/contact.routes';
import infoRouter from './routes/info.routes';
import { Request, Response } from 'express';
require('dotenv').config();

const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3001;

// middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('dist'));
morgan.token('body', (req: Request) => JSON.stringify(req.body));

// Custom format: dev format + request body at the end
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use('/api/contacts', contactRouter);
app.use('/api/info', infoRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('New Contact API');
});

app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
	console.error(err);
	res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

export default app;
