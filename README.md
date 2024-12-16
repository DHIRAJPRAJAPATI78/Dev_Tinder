// How to connect to database

1. const mongoose = require("mongoose");
2. const connectDB = async () => {
   // Anything write after / of the connection string . It would create the database of that name
   await mongoose.connect(
   "mongodb+srv://Dhiraj_Prajapati12:Dhiraj%40123@devapp.omvz0.mongodb.net/DevTinder_Project"
   );
   };

// how to store data in database

1. install mongoose
2. define schema
3. create model
