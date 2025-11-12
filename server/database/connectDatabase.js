const mongoose = require("mongoose");
const { mongoUri } = require("../src/api/dotenv");

exports.connectDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("database connected successfully ");
  } catch (error) {
    return error;
  }
};
