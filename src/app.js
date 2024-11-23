const express = require("express");
const app = express();

app.use("/post ", (req, res) => {
  res.send("this is post call");
});
app.post("/test", (req, res) => {
  res.send("Hello World !");
});

app.get("/dev", (req, res) => {
  res.send("Hello dev !");
});
app.delete("/", (req, res) => {
  res.send("Hello there how are you!");
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
