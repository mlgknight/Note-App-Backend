import mongoose from 'mongoose';
import 'dotenv/config';
const connectDB = async () => {

	const URL = process.env.MONGODB_URI
	if(!URL) {
		throw new Error ('MONGODB_URI environment variable is not set')
	}

	try {
		const conn = await mongoose.connect(URL);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error('Database connection error:', error);
		process.exit(1);
	}
};

export default connectDB;
