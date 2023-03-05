const express = require("express");
const app = express();
const getrouter = require("./Router/getrouter");
// const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config()

app.use(cors());

app.use(express.json());

const db = require("./db");

db.then((res) => {
  console.log("DB has been successfully connected");
  app.listen(9000, () => {
    console.log(`Server Running.. ${process.env.BASE_URL}`);
  });
});
db.catch((err) => console.log("DB not connect", err));

app.use("/", getrouter);
