import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import noteRouter from './routes/note.routes.ts';
import userRouter from './routes/user.routes.ts';
import loginRouter from './routes/login.routes.ts'
import resetDBRouter from './routes/restDB.routes.ts'
import connectDB from './utils/database.ts';
import { errorHandler } from './utils/middleware.ts';
import 'express-async-errors';
import cors from 'cors';

const app = express();


app.use(cors())


// Connect to MongoDB
connectDB();
// middleware
app.use(express.json());
app.use(express.static('dist'));

app.use('/api/notes', noteRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/reset', resetDBRouter);

// Then error handling middleware
app.use(errorHandler);


export default app;
