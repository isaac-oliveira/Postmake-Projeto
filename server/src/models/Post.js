const mongoose = require("../database");

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  hashtags: [
    {
      type: String,
      require: true,
    },
  ],
  createdAt: {
    type: Date,
    require: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
