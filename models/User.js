const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const { Schema } = mongoose;

const userSchema = new Schema({
  token: String,
  username: String,
  email: String,
  password: String,
  games: {
    guessTheNote: {
      easy: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      },
      medium: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      },
      hard: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      }
    },
    melody: {
      easy: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      },
      medium: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      },
      hard: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      }
    },
    intervals: {
      easy: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      },
      medium: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      },
      hard: {
        tries: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
      }
    }
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("user", userSchema);
