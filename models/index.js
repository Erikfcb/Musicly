const mongoose = require("mongoose");
const User = require("./User");
const keys = require("../config/keys");

mongoose.set('debug', true)
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  }
);

exports.User = User;