const mongoose = require("../database");
const bcrypt = require("bcrypt");

const Post = require("./Post");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  console.log(this.name);

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
