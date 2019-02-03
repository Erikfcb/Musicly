const mongoose = require("mongoose");
const User = mongoose.model("user");
const path = require("path");
const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');

router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

router.use(auth.tokenMiddleware);

// Fetch games
router.post("/api/games", (req, res) => {
  const data = {
    games: {}
  };
  const { user } = req;
  data.games = user.games;
  res.send(data);
});

//Fetch progress
router.post("/api/progress", (req, res) => {
  const { user } = req;
  const data = { progress: 0, tries: 0, correct: 0 };
  const level = req.body.level.toLowerCase();
  try {
    const progress =
      (user.games[req.body.game][level].correct * 100) /
      user.games[req.body.game][level].tries;
    data.progress = progress;
    data.tries = user.games[req.body.game][level].tries;
    data.correct = user.games[req.body.game][level].correct;

    if (isNaN(progress)) {
      data.progress = 0;
    }

    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/api/updateProgress", async (req, res) => {
  const { user } = req;
  let newGames = {};
  let newTries = 0;
  let newCorrect = 0;
  const level = req.body.level.toLowerCase();

  if (req.body.correct) {
    newGames = user.games;
    newTries = user.games[req.body.game][level].tries + 1;
    newCorrect = user.games[req.body.game][level].correct + 1;
    newGames[req.body.game][level].tries = newTries;
    newGames[req.body.game][level].correct = newCorrect;
  } else {
    newGames = user.games;
    newTries = user.games[req.body.game][level].tries + 1;
    newGames[req.body.game][level].tries = newTries;
  }

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        games: newGames
      }
    }
  ).exec();

  res.sendStatus(200);
});

router.post("/api/reset", async (req, res) => {
  const { user } = req;
  let games = {};
  try {
    games = user.games;

    const game = games[req.body.name];
    game.easy.tries = 0;
    game.easy.correct = 0;
    game.medium.tries = 0;
    game.medium.correct = 0;
    game.hard.tries = 0;
    game.hard.correct = 0;

    games[req.body.name] = game;

    await User.findByIdAndUpdate(
      user._id,
      { $set: { games } }
    ).exec();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
