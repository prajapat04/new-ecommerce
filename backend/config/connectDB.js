import mongoose from "mongoose";

export const connectDB=async()=>{
  try {
    mongoose.connection.on('connected', ()=> console.log("detabase Connected"));
    await mongoose.connect(`${process.env.MONGO_URI}/greencart`)
    console.log("connect to MongoDB");
    } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};