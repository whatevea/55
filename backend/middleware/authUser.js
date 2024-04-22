import passport from "passport";

export const initialize = () => passport.initialize();

export const authenticate = (req, res, next) => {
  passport.authenticate("user", { session: false }, (err, user, info) => {
    console.log("user is", user, err, info);

    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Session Expired" });

    console.log("req is", req);

    req.user = user;
    next();
  })(req, res, next);
};
