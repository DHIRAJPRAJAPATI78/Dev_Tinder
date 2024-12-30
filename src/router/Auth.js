const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignupData } = require("../utils/validation");
const cookies = require("cookies");
const express = require("express");
const authRouter = express.Router();
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        //create jwt
        const token = await jwt.sign({ _id: user._id }, "Dev@123");
        //create cookies and send the token inside the cookies
        res.cookie("token", token);
        res.send("Login successfully");
      } else {
        throw new Error("invalid credentials");
      }
    }
  } catch {
    res.status(404).send("invalid credentials");
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password, skills, about } = req.body;
    //password protection
    const hashPassword = await bcrypt.hash(password, 10);
    //creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      skills,
      about,
    });
    await user.save();
    res.send("successfully");
  } catch {
    res.status(400).send("bhai error hai");
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("sucessfully Logout");
});
module.exports = authRouter;
