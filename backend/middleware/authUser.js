import passport from "passport";

export const initialize = () => passport.initialize();

export const authenticate = (req, res, next) => {
  passport.authenticate("user", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Session Expired" });

    req.user = user;
    next();
  })(req, res, next);
};
