const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Dhiraj_Prajapati12:Dhiraj%40123@devapp.omvz0.mongodb.net/"
  );
};
module.exports = connectDB;
