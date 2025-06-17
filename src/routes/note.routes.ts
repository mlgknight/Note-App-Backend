import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Note from '../../models/Note.ts';

const noteRouter = Router();

noteRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const notes = await Note.find({});
		res.json(notes);
	} catch (error) {
		next(error);
	}
});

noteRouter.post(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.body.content) {
				return res.status(400).json({ error: 'content missing' });
			}
			const note = new Note({
				content: req.body.content,
				important: req.body.important ?? false,
			});
			const newNote = await note.save();
			res.json(newNote);
		} catch (error) {
			next(error);
		}
	}
);

noteRouter.get(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const note = await Note.findById(req.params.id);
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		} catch (error) {
			next(error);
		}
	}
);

noteRouter.delete(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await Note.findByIdAndDelete(req.params.id);
			res.status(204).end();
		} catch (error) {
			next(error);
		}
	}
);

noteRouter.put(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		const { content, important } = req.body;

		try {
			const noteToUpdate = await Note.findById(req.params.id);
			if (!noteToUpdate) {
				return res.status(404).end();
			}

			noteToUpdate.content = content;
			noteToUpdate.important = important;

			const updatedNote = await noteToUpdate.save();
			return res.json(updatedNote);
		} catch (error) {
			next(error);
		}
	}
);

export default noteRouter;
