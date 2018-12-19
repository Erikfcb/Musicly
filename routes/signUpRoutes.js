const mongoose = require("mongoose");
const User = mongoose.model("user");
const express = require("express");
const router = express.Router();

router.post("/api/signup/checkexist", async (req, res) => {
  const checks = {
    username: false,
    email: false
  };

  await User.findOne({ email: req.body.email }, (err, user) => {
    //if email exists.
    if (user != null) {
      checks.email = true;
    }
  });

  await User.findOne({ username: req.body.username }, (err, user) => {
    //if username exists.
    if (user != null) {
      checks.username = true;
    }
  });
  res.send(checks);
});

router.post("/api/signup/new", (req, res) => {
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },
    (err, item) => {
      if (err) console.log("Something went wrong : " + err);
      else {
        console.log(item);
        res.send({ id: item._id });
      }
    }
  );
});

module.exports = router;
