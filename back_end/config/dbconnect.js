import mongoose from "mongoose";

const Connnetdb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default Connnetdb;