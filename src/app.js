const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { off } = require("../models/user.js");
const users = require("../models/user.js");

// Import routes

//Router Middlewares
app.use(express.json());

//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be returned.
//output id can be in any order.

app.get("/", async function (req, res) {
  var ids = [];

  //Write your code here
  //modify the ids array

  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  const usersArray = await users
    .find({})
    .skip(limit * offset)
    .limit(limit)
    .select("_id");

  const ids = usersArray.map((user) => user._id);

  res.send(ids);
});

module.exports = app;
