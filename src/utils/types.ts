import { Document, Types } from 'mongoose';

export interface INote extends Document {
	content: string;
	important: boolean;
	user: Types.ObjectId;
}

export interface IUser extends Document {
	username: string;
	name: string;
	passwordHash: string;
	notes: Types.ObjectId[];
}
