const mongoose = require("mongoose");

async function connectionDataBase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database berjalan dengan baik");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectionDataBase;
