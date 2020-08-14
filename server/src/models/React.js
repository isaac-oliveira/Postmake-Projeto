const mongoose = require("../database");

const ReactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    require: true,
  },
  type: {
    type: String,
    enum: ["loved", "like", "dislike"],
    require: true,
  },
});

const React = mongoose.model("React", ReactSchema);

module.exports = React;
