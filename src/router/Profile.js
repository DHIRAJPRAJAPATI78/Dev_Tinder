const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfile } = require("../utils/validation");
const express = require("express");
const profileRouter = express.Router();
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    console.log(userAuth);
    res.send(req.user);
  } catch (err) {
    res.status(404).send(err);
  }
});
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    console.log(loggedInUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = profileRouter;
