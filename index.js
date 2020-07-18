require("dotenv").config({ path: __dirname + "/src/config/.env" });
require("./src/services/passport");

const express = require("express");

const app = express();
require("./src/routes/auth-routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
