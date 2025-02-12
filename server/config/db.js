import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const res = await mongoose.connect(
      "mongodb+srv://jayprakash1200:Jay%4017423@cluster0.w6svg.mongodb.net/fileUploader"
    );
    if (res) {
      console.log(" Database connect successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
