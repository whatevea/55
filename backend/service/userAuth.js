import passport from "passport";
import { ExtractJwt, Strategy as StrategyJwt } from "passport-jwt";

import User from "../models/user.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "user",
  new StrategyJwt(options, async (jwtPayload, done) => {
    return User.findById(jwtPayload.id)
      .select("-password")
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  })
);
