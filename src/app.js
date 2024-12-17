const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

// making a post api call to save the data into the database
app.use(express.json()); //middleware to parse json data
app.get("/user", async (req, res) => {
  let useremail = req.body.emailId;
  const user = await User.find({ emailId: useremail });
  try {
    if (user.length == 0) {
      res.status(404).send("galat email hai");
    } else {
      res.send(user);
    }
  } catch {
    res.status(500).send("server error");
  }
});
app.get("/feed", async (req, res) => {
  // let useremail=req.body.emailId
  const user = await User.find({});
  try {
    res.send(user);
  } catch {
    res.status(404).send("error message");
  }
});
app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //password protection
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    //creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send("successfully");
  } catch {
    res.status(400).send("bhai error hai");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted sucessfully");
  } catch {
    res.status(404).send("error hai");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    console.log(user);
    if (!user) {
      throw new Error("invalid credentials");
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        res.send("Login successfully");
      } else {
        throw new Error("invalid credentials");
      }
    }
  } catch {
    res.status(404).send("invalid credentials");
  }
});

connectDB()
  .then(() => {
    console.log("Database establlished");
    // right way to put start server is there (after connecting to the database)
    app.listen(7000, () => {
      console.log("Server is running on port 7000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
