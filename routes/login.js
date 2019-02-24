const mongoose = require("mongoose");
const User = mongoose.model("user");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const router = express.Router();

router.post("/api/login", (req, res) => {
  const data = {
    exist: false,
    user: {}
  };
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.sendStatus(500);
    if (!user) return res.json(data).status(404);

    bcrypt.compare(req.body.password, user.password, (err, valid) => {
      if (err || !valid) return res.json(data).status(400);

      user.token = crypto.randomBytes(60).toString("hex");
      user.save((err, updatedUser) => {
        if (err) return res.sendStatus(500);

        data.user = updatedUser;
        data.exist = true;

        res.send(data);
      });
    });
  });
});

router.post("/api/login/id", (req, res) => {
  const data = {
    user: {}
  };

  User.findById(req.body.id, (err, user) => {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);

    if (user._id == req.body.id) {
      data.user = user;
    }
    res.send(data);
  });
});

module.exports = router;
