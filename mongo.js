import mongoose from 'mongoose';

const password = process.argv[2];
const person = process.argv[3];
const number = process.argv[4];

const URL = `mongodb+srv://fullstack:${password}@cluster0.iy6je.mongodb.net/Contacts?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(URL);

const contactSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Contact = mongoose.model('Contacts', contactSchema);

if (process.argv.length === 3) {
	Contact.find({}).then((result) => {
		result.forEach((contact) => {
			console.log(`phonebook: ${contact}`);
            mongoose.connection.close();
		});
	});
} else if (process.argv.length < 5) {
	console.log('need password and data as argument');
	process.exit(1);
} else {
	const contact = new Contact({
		name: person,
		number: number,
	});

	contact.save().then((result) => {
		console.log(`added ${result.name} number ${result.number} to phonebook`);
		mongoose.connection.close();
	});
}
