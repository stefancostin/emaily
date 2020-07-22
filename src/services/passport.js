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
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = { googleId: profile.id };

      const existingUser = await User.findOne(user);
      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }
      // we don't have a user record with this ID, make a new record
      const createdUser = await new User(user).save();
      done(null, createdUser);
    }
  )
);
