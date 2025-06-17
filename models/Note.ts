import mongoose, { Document, Schema, Model } from 'mongoose';

interface INote extends Document {
	content: string;
	important: boolean;
}

const noteSchema = new Schema<INote>({
	content: { type: String, minlength: 5, required: true },
	important: { type: Boolean, required: true },
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
