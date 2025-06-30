import 'dotenv/config';
import express from 'express';
import noteRouter from './routes/note.routes.ts';
import userRouter from './routes/user.routes.ts';
import connectDB from './utils/database.ts';
import { errorHandler } from './utils/middleware.ts';
import 'express-async-errors';

const app = express();

// Connect to MongoDB
connectDB();
// middleware
app.use(express.json());
app.use(express.static('dist'));

app.use('/api/notes', noteRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);


export default app;
