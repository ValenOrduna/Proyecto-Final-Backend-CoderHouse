import mongoose from "mongoose";

const collection = "products";

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  stock: Number,
  price: Number,
});

const Product = mongoose.model(collection, ProductSchema);

export default Product;
