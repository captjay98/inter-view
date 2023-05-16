// dbMiddleware.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const dbConnect = async () => {
  try {
    const dbURI = "mongodb+srv://noder:noder@nodetuts.xbadjti.mongodb.net/?retryWrites=true&w=majority";

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

