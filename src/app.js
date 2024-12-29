const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cparser = require("cookie-parser");
app.use(express.json()); //middleware to parse json data
app.use(cparser());

const authRouter = require("./router/Auth");
const profileRouter = require("./router/Profile");
const requestRouter = require("./router/Request");
const userRouter = require("./router/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
  .then(() => {
    console.log("Database establlished");
    // right way to put start server is there (after connecting to the database)
    app.listen(7000, () => {
      console.log("Server is running on port 7000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected :", err);
  });
