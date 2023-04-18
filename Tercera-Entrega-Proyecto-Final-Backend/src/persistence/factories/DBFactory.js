import dotenv from "dotenv";
import mongoose from "mongoose";
import DBFirebase from "../db/FirebaseConfig.js";

dotenv.config();

const connectDb = () => {
  const environment = process.env.NODE_ENV || "development";
  if (environment == "production") {
    mongoose.set("strictQuery", true);
    return mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return DBFirebase;
};

export default connectDb;
