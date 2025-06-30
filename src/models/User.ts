import mongoose, { Document, Schema, Model } from 'mongoose';
import type { IUser } from '../utils/types.ts';

const userSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: String,
	passwordHash: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note',
		},
	],
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	},
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
