import mongoose from "mongoose";

const collection = "carts";

const CartSchema = new mongoose.Schema({
  products: Array,
});

const carts = mongoose.model(collection, CartSchema);

export default carts;
