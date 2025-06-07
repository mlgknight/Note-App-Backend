import express from 'express';
import cors from 'cors';
import noteRouter from './routes/note.routes.js';
const app = express();
const PORT = process.env.PORT || 3001;
// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use('/api/notes', noteRouter);
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
