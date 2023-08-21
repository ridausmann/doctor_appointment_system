const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongo connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error occured ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
