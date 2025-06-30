import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import User from '../models/User.ts';

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await User.find({}).populate('notes', { content: 1, important: 1 });
	res.json(users);
};

export const addNewUser = async (req: Request, res: Response) => {
	const { username, name, password } = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const existingUser = await User.findOne({ username: user.username });

	if (existingUser) {
		return res.status(400).json({ error: 'Username already exists' });
	}

	const savedUser = await user.save();
	res.status(201).json(savedUser);
};
