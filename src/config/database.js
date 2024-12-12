const mongoose = require("mongoose");
const connectDB = async () => {
  // Anything write after / of the connection string . It would create the database of that name
  await mongoose.connect(
    "mongodb+srv://Dhiraj_Prajapati12:Dhiraj%40123@devapp.omvz0.mongodb.net/DevTinder_Project"
  );
};
module.exports = connectDB;
