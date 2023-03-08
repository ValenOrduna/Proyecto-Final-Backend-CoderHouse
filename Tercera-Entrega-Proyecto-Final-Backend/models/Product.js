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

const products = [
  {
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_787221-MLA48007684849_102021-F.webp%202x",
    title: "Smart TV Samsung Series 7",
    description: "Televisor 50 pulgadas LED 220v-240v Smart TV",
    stock: 10,
    price: 134000,
  },
  {
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_754237-MLA44715287415_012021-F.webp 2x",
    title: "Parlante JBL Go 3",
    description: "Parlante JBL 3 portátil con bluetooth resistente al agua",
    stock: 5,
    price: 14599,
  },
  {
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_973781-MLA48131216539_112021-F.webp 2x",
    title: "Monitor gamer Samsung F24T35",
    description:
      "Monitor gamer Samsung F24T35 led 24 azul y gris oscuro 100V/240V",
    stock: 2,
    price: 53499,
  },
  {
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_959787-MLA48928534188_012022-F.webp 2x",
    title: "Funda Para Notebook 13.3",
    description: "Funda Para Notebook 13.3  - 14  - 15.6  Con Bolsillo Externo",
    stock: 7,
    price: 7200,
  },
  {
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_816480-MLA47777273514_102021-F.webp 2x",
    title: "Apple iPhone 13 Pro Max",
    description: "pple iPhone 13 Pro Max (128 GB) - Plata",
    stock: 2,
    price: 690000,
  },
  {
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_708839-MLA51356236557_082022-F.webp 2x",
    title: "MacBook Air M2 2022 midnight 13.6 ",
    description:
      "MacBook Air M2 2022 midnight 13.6 Apple M2 8GB de RAM 512GB SSD, Apple M2 10-Core GPU 2560x1664px macOS Monterrey",
    stock: 4,
    price: 899999,
  },
];

const addProducts = async (product) => {
  await Product.create(product);
  console.log("Producto añadido con exito");
};

export default Product;
