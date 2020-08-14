const express = require("express");

const RegisterController = require("./controllers/RegisterController");
const LoginController = require("./controllers/LoginController");
const PostController = require("./controllers/PostController");
const FollowController = require("./controllers/FollowController");
const FeedController = require("./controllers/FeedController");
const ReactController = require("./controllers/ReactController");
const UserController = require("./controllers/UserController");
const ProfileController = require("./controllers/ProfileController");
const TruncateController = require("./controllers/TruncateController");

const { validation } = require("./middlewares/auth");

const routes = express.Router();

routes.post("/register", RegisterController.store);
routes.post("/login", LoginController.store);

routes.use(validation);

routes.post("/post", PostController.store);
routes.get("/post", PostController.index);

routes.post("/follow", FollowController.store);
routes.get("/follow", FollowController.index);
routes.delete("/unfollow/:id", FollowController.delete);

routes.get("/feed", FeedController.index);

routes.post("/react/:post_id/:type", ReactController.store);

routes.get("/profile", ProfileController.show);

routes.get("/user", UserController.index);

routes.delete("/user", RegisterController.delete);

routes.delete("/truncate", TruncateController.delete);

module.exports = routes;
