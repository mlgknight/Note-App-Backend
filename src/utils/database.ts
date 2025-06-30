import mongoose from 'mongoose';
import { MONGODB_URI } from './config.ts';
import logger from './logger.ts';
const connectDB = async () => {
   const URL = MONGODB_URI;

   if (!URL) {
      throw new Error('MONGODB_URI environment variable is not set');
   }

   try {
      const conn = await mongoose.connect(URL);
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
      logger.error('Database connection error:', error);
      process.exit(1);
   }
};

export default connectDB;
