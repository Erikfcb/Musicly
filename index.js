const express = require("express");
const bodyParser = require("body-parser");
const package = require('./package');
const database = require('./models');
const appRouter = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Mounting api router
app.use(appRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
