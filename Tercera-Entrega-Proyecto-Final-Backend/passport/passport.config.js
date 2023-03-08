import passport from "passport";
import local from "passport-local";
import User from "../models/User.js";
import Carts from "../models/Cart.js";
import { sendEmailRegister } from "../src/helpers/sendEmail.js";
import { createHash, isValid } from "../utils/crypt.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (user) return done(null, false);
          const newUser = {
            username: username,
            email: req.body.email,
            age: Number(req.body.age),
            address: req.body.address,
            phone: req.body.phone,
            avatar: req.body.nameImageAvatar,
            password: createHash(password),
          };

          try {
            const cart = await Carts.create({ products: [] });
            const insertUser = { ...newUser, idCart: cart._id };
            const user = await User.create(insertUser);
            await sendEmailRegister(newUser);
            return done(null, user);
          } catch (err) {
            done(err);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) return done(null, false);
          if (!isValid(user, password)) return done(null, false);
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const userId = await User.findById(id);
      done(null, userId._id);
    } catch (err) {
      done(err);
    }
  });
};
