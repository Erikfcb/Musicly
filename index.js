const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const path = require("path");

require("./models/User");

const signupRouter = require("./routes/signUpRoutes");
const loginRouter = require("./routes/loginRoutes");
const generalRouter = require("./routes/generalRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(signupRouter);
app.use(loginRouter);
app.use(generalRouter);

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running...");
});
