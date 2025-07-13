import type { Request, Response } from 'express';
import Note from '../models/Note.ts';
import User from '../models/User.ts';
import jwt from 'jsonwebtoken';

const getTokenFrom = (req: Request): string => {
	const authorization = req.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	throw new Error('Token missing');
};

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
	interface DecodedToken extends jwt.JwtPayload {
		id: string;
	}
	const { content, important } = req.body;

	const secret = process.env.SECRET;
	if (!secret) {
		return res
			.status(500)
			.json({ error: 'SECRET key is missing from environment variables' });
	}

	const decodedToken = jwt.verify(getTokenFrom(req), secret) as DecodedToken;

	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token invalid' });
	}
	const user = await User.findById(decodedToken.id);

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
