const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
// making a post api call to save the data into the database
app.post("/signup", async (req, res) => {
  //creating a new instance of the User model
  const user = new User({
    firstName: "Niraj",
    lastName: "Prajapati",
    emailId: "xyz@gamil.com",
    password: "@dhiraj123",
  });
  await user.save();
  res.send("successfully");
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
