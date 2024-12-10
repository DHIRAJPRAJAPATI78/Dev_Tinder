const express = require("express");
const connectDB = require("./config/database");
const app = express();
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
