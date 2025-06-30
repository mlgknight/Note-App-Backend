import mongoose, { Document, Schema, Model } from 'mongoose';
import type { INote } from '../utils/types.ts';

const noteSchema = new Schema<INote>({
	content: { type: String, minlength: 5, required: true },
	important: { type: Boolean, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Note: Model<INote> = mongoose.model<INote>('Note', noteSchema);

export default Note;
