const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
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
  //creating a new instance of the User model
  const user = new User(req.body);
  try {
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
