import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const res = await mongoose.connect(
      process.env.MONGO_DB_URL
    );
    if (res) {
      console.log(" Database connect successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
