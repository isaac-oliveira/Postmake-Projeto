const mongoose = require("../database");

const FollowSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  followed_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Follow = mongoose.model("Follow", FollowSchema);

module.exports = Follow;
