import type { Request, Response } from 'express';
import Note from '../models/Note.ts';
import User from '../models/User.ts';

export const getAllNotes = async (req: Request, res: Response) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
	res.json(notes);
};

export const getSingleNote = async (req: Request, res: Response) => {
	const note = await Note.findById(req.params.id);
	if (note) {
		res.json(note);
	} else {
		res.status(404).end();
	}
};

export const addNewNote = async (req: Request, res: Response) => {
	const { content, important, userId } = req.body;

	const user = await User.findById(userId);


	if (!user) {
		return res.status(400).json({ error: 'userId missing or not valid' });
	}

	if (!content) {
		return res.status(400).json({ error: 'content missing' });
	}
	const note = new Note({
		content,
		important: important || false,
    user: user._id,
	});
	const savedNote = await note.save();
	user.notes = user.notes.concat(savedNote.id);
	await user.save();

	res.status(201).json(savedNote);
};

export const deleteNote = async (req: Request, res: Response) => {
	await Note.findByIdAndDelete(req.params.id);
	res.status(204).end();
};

export const updateNote = async (req: Request, res: Response) => {
	const { content, important } = req.body;
	const note = await Note.findById(req.params.id);
	if (!note) {
		return res.status(404).end();
	}
	note.content = content;
	note.important = important;
	const updatedNote = await note.save();
	res.json(updatedNote);
};
