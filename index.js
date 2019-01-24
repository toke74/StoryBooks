const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

const app = express();

require("./models/User");
require("./models/Story");
require("./config/passport");

mongoose.connect(
  keys.mongodbUrl,
  { useNewUrlParser: true }
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/users")(app);
require("./routes/stories")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
