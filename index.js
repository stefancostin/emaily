require("dotenv").config({ path: __dirname + "/src/config/.env" });
require("./src/models/user");
require("./src/services/passport");

const cookieSession = require("cookie-session");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const authRoutes = require("./src/routes/auth-routes");

mongoose.connect(process.env.MONGO_DB_URI);

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
