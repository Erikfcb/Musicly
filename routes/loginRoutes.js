const mongoose = require("mongoose");
const User = mongoose.model("user");
const express = require("express");
const router = express.Router();

router.post("/api/login", async (req, res) => {
  const data = {
    exist: false,
    user: {}
  };
  await User.findOne({ username: req.body.username }, (err, user) => {
    //if email exists.
    if (user != null) {
      if (
        user.username == req.body.username &&
        user.password == req.body.password
      ) {
        data.exist = true;
        data.user = user;
      }
    }
    res.send(data);
  });
});

router.post("/api/login/id", (req, res) => {
  const data = {
    user: {}
  };

  User.findOne({ _id: req.body.id }, (err, user) => {
    if (user != null) {
      if (user._id == req.body.id) {
        data.user = user;
      }
    }
    res.send(data);
  });
});

module.exports = router;
