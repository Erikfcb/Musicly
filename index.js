const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

require("./models/User");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

require("./routes/generalRoutes")(app);
require("./routes/signUpRoutes")(app);
require("./routes/loginRoutes")(app);

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running...");
});
