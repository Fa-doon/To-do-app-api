const mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION_URL = process.env.DB_URL;
function connectToMongodb() {
  mongoose.connect(CONNECTION_URL);

  mongoose.connection.on("connected", () => {
    console.log(`Successfully connected to DB`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`An error occured`);
  });
}

module.exports = { connectToMongodb };
