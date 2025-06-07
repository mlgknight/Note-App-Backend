import express from 'express';
import cors from 'cors';
import { notes, noteRouter } from './routes/note.routes';
const app = express();
const PORT = process.env.PORT || 3001;
// middleware
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRouter);
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
