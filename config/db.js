const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`mongoDB connected - ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, msg: "cant connect to Database" });
  }
};

module.exports = connectDB;
