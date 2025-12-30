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
    mongoose.connection.on('connected',()=>console.log('DB c'))
    await mongoose.connect(`${process.env.MONGODB_URL}/pingup`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error; // ⬅️ important: throw, don’t exit
  }
};

export default connectDB;
