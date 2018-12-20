const mongoose = require("mongoose");
const User = mongoose.model("user");
const express = require("express");
const router = express.Router();

router.post("/api/signup/checkexist", async (req, res) => {
  let checks = {
    email: false,
    username: false
  };

  const user = await User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    (err, user) => {
      return user;
    }
  );

  if (user != null) {
    if (user.email == req.body.email) {
      checks.email = true;
    }
    if (user.username == req.body.username) {
      checks.username = true;
    }
  }
  res.json(checks);
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
