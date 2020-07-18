const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // for authorization the MongoDB generated id is used
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((existingUser) => {
    done(null, existingUser);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = { googleId: profile.id };

      User.findOne(user).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record
          new User(user).save().then((createdUser) => done(null, createdUser));
        }
      });
    }
  )
);
