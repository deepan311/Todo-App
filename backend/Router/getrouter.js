const express = require("express");
const getrouter = express.Router();
const { getAllData, create ,update, deleteData} = require("../Controler/dataCRUD")

getrouter.get("/", getAllData);
getrouter.post("/create", create);
getrouter.put("/update/:id",update);
getrouter.delete("/deleteData/:id",deleteData)
module.exports = getrouter;
