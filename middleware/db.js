// dbMiddleware.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const dbConnect = async () => {
  try {
    const dbURI = process.env.DB_URI || 'mongodb://localhost/subscribers';

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

