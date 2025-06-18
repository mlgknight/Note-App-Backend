import mongoose from 'mongoose';

const mongoDB = process.env.MONGODB || 'mongodb+srv://fullstack:Oussama2100@cluster0.iy6je.mongodb.net/Contacts?retryWrites=true&w=majority&appName=Cluster0';

mongoose.set('strictQuery', false);

async function connectDB() {
	if (!mongoDB) {
		throw new Error('MONGODB environment variable is not set');
	}

	try {
		await mongoose.connect(mongoDB);
        console.log('Connected to MongoDB')
	} catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

connectDB()