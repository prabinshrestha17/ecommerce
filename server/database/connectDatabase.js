const mongoose = require("mongoose");
const { mongoUri } = require("../src/api/dotenv");

exports.connectDb = async () => {
  try {
   mongoose
     .connect(mongoUri)
     .then(() => console.log("MongoDB connected"))
     .catch(err => console.log("Error connecting to MongoDB:", err));

  } catch (error) {
    return error;
  }
};
