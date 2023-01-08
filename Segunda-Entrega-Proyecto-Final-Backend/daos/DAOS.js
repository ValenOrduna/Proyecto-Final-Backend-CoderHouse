import Mongo from "../classes/mongo/mongo.js";
import Firebase from "../classes/firebase/firebase.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const mongo = new Mongo(
  "mongodb+srv://valenordu:valenordu@cluster0.dezvmft.mongodb.net/?retryWrites=true&w=majority"
);

const firebase = new Firebase("./credentials.json");

const db_detected = () => {
  if (process.env.DB == "mongodb") {
    return mongo;
  } else if (process.env.DB == "firebase") {
    return firebase;
  }
};

export default db_detected;
