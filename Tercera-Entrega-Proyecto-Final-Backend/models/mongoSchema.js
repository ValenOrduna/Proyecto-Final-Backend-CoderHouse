import users from "./User.js";
import carts from "./Cart.js";
import products from "./Product.js";

class MongoSchema {
  constructor(collection) {
    this.collection = collection;
  }

  findAll = async () => {
    const result = await this.collection.find();
    return result;
  };

  find = async (find) => {
    const result = await this.collection.findById(find);
    return result;
  };

  create = async (data) => {
    const result = await this.collection.create(data);
    return result;
  };

  update = async (find, data) => {
    const result = await this.collection.updateOne(find, data);
    return result;
  };
}

const MongoProduct = new MongoSchema(products);
const MongoUser = new MongoSchema(users);
const MongoCart = new MongoSchema(carts);

export { MongoProduct, MongoUser, MongoCart };
