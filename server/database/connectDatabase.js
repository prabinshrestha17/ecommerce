const mongoose = require("mongoose");
const { mongoUri } = require("../src/api/dotenv");



exports.connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};
;
