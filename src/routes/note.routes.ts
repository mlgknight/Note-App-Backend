import { Router } from 'express';
import {
   getAllNotes,
   addNewNote,
   getSingleNote,
   deleteNote,
   updateNote,
} from '../controllers/note.controller.ts';

const noteRouter = Router();

noteRouter.get('/', getAllNotes);

noteRouter.post('/', addNewNote);

noteRouter.get('/:id', getSingleNote);

noteRouter.delete('/:id', deleteNote);

noteRouter.put('/:id', updateNote);

export default noteRouter;
