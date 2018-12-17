const mongoose = require("mongoose");
const User = mongoose.model("user");

module.exports = app => {
  app.post("/api/login", async (req, res) => {
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

  app.post("/api/login/id", async (req, res) => {
    const data = {
      user: {}
    };

    await User.findOne({ _id: req.body.id }, (err, user) => {
      if (user != null) {
        if (user._id == req.body.id) {
          data.user = user;
        }
      }
      res.send(data);
    });
  });
};
