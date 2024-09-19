import mongoose from 'mongoose';
import 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(
      `MongoDB connected to cluster: ${conn.connection.host}`.rainbow
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log('An unknown error occurred');
    }

    process.exit(1);
  }
};

export default connectDB;
