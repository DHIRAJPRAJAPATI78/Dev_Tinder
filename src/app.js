const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("Hello World !");
});
app.get("/", (req, res) => {
  res.send("Hello there how are you!");
});
app.get("/dev", (req, res) => {
  res.send("Hello dev !");
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
