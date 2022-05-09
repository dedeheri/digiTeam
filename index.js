require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const database = require("./src/database/database");
const usersRoute = require("./src/route/users");

// middleware
app.use(bodyParser.json());
app.use(cors());

// endpoint
app.use("/v1/auth", usersRoute);

// error

// database
database();

// listen
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server berjalan di PORT ${port}`);
});
