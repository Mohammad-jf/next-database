import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

async function connectDb() {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('DataBase has been connected');
      return;
    } else {
      await mongoose.connect(uri);
      console.log('connected to DataBase');
    }
  } catch (error) {
    console.log(error, 'connection Failed');
  }
}

export default connectDb;
