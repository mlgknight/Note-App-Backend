import mongoose from 'mongoose';
import type { Contact } from '../src/types/types'



const contactSchema = new mongoose.Schema<Contact>({
	name: String,
	number: String,
});

const Contact = mongoose.model<Contact>('Contacts', contactSchema);

export default Contact;
