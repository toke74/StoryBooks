const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleAccessToken: {
    type: String
  },
  githubAccessToken: {
    type: String
  },
  googleID: {
    type: String
  },
  githubID: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },

  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("users", userSchema);
