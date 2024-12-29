const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookies = require("cookies");
const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies; // req.cookies send object of keys 'token' and one more thing(ek aur chiz)
    const { token } = cookie;
    if (!token) {
      throw new Error("inavlid token !!!!!!!!");
    }

    const decodedMessage = await jwt.verify(token, "Dev@123");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send("Error " + error);
  }
};
module.exports = {
  userAuth,
};
