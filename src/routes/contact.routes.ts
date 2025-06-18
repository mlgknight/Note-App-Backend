import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import Contact from '../../models/Contact';

export const contactRouter = Router();

// Get all contacts
contactRouter.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const contacts = await Contact.find({}).select('-__v');
			return res.json(contacts);
		} catch (err) {
			return next(err);
		}
	}
);

// Add a new contact
contactRouter.post(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, number } = req.body;
		if (!name) {
			return res.status(400).json({ error: 'Name data is required' });
		}
		if (!number) {
			return res.status(400).json({ error: 'Number data is required' });
		}
		try {
			const userFound = await Contact.findOne({ name });
			if (userFound) {
				return res.status(400).json({
					error: `Cannot add user as ${userFound.name} is already in the database`,
				});
			}
			const contact = new Contact({ name, number });
			const result = await contact.save();
			console.log(`added ${result.name}`);
			return res.status(201).json(result);
		} catch (error) {
			return next(error);
		}
	}
);

// Get a contact by ID
contactRouter.get(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.params.id;
			const user = await Contact.findById(userId).select('-__v');
			if (user) {
				return res.json(user);
			} else {
				return res.status(404).json({ error: 'User not found' });
			}
		} catch (error) {
			return next(error);
		}
	}
);

// Delete a contact by ID
contactRouter.delete(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		try {
			const deleted = await Contact.findByIdAndDelete(userId);
			if (deleted) {
				return res.status(204).end();
			} else {
				return res.status(404).json({ error: 'User not found' });
			}
		} catch (error) {
			return next(error);
		}
	}
);

contactRouter.put(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const { name, number } = req.body;
		if (!name || !number) {
			return res.status(400).json({ error: 'Name and number are required' });
		}

		try {
			const duplicate = await Contact.findOne({ name, _id: { $ne: id } });
			if (duplicate) {
				return res
					.status(400)
					.json({ error: 'Another user with this name already exists' });
			}
			const updated = await Contact.findByIdAndUpdate(
				id,
				{ name, number },
				{ new: true, runValidators: true }
			);
			if (updated) {
				return res.json(updated);
			} else {
				return res.status(404).json({ error: 'User not found' });
			}
		} catch (error) {
			next(error);
		}
	}
);
