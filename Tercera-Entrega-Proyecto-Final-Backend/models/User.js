import mongoose from "mongoose";

const collection = "users";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  address: String,
  phone: String,
  avatar: String,
  password: String,
  idCart: String,
});

const users = mongoose.model(collection, UserSchema);

export default users;
