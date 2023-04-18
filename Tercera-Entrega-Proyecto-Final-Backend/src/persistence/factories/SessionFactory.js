import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { MemoryStore } from "express-session";

dotenv.config();

const getConfigSession = () => {
  let store;
  const environment = process.env.NODE_ENV || "development";
  if (environment == "production") {
    store = MongoStore.create({
      mongoUrl: process.env.URISESSIONS,
    });
  } else {
    store = new MemoryStore({
      checkPeriod: 86400000,
    });
  }
  return session({
    store: store,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  });
};

export default getConfigSession;
