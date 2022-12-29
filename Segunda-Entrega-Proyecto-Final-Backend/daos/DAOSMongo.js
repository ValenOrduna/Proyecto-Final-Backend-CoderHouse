const Firebase = require("../classes/firebase/firebase");
const Mongo = require("../classes/mongo/mongo");

module.exports = mongo = new Mongo(
  "mongodb+srv://valenordu:valenordu@cluster0.dezvmft.mongodb.net/?retryWrites=true&w=majority"
);
