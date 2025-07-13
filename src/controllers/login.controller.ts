import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import User from '../models/User.ts';
import 'dotenv/config';

export const addNewLogin = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: 'invalid username or password',
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	if (process.env.SECRET) {
		const token = jwt.sign(userForToken, process.env.SECRET, {
			expiresIn: 60 * 60,
		});

		res.status(200).send({ token, username: user.username, name: user.name });
	}
};
