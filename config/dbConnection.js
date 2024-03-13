const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_STRING);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
