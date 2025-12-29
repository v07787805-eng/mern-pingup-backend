import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }

    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is missing in environment variables');
    }

    const db = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'your_db_name', // optional but recommended
    });

    isConnected = db.connection.readyState === 1;

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error; // ⬅️ important: throw, don’t exit
  }
};

export default connectDB;
