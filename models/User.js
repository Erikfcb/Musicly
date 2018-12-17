const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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
    chords: {
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
// const User = mongoose.model("user", userSchema);

// User.create(
//   {
//     email: "erikfcb@gmail.com"
//     },
//   (err, item) => {
//     if (err) console.log("Something went wrong : " + err);
//     else {
//       console.log("New item: ");
//       console.log(item);
//     }
//   }
// );

mongoose.model("user", userSchema);
