var express = require("express");
var app = express();
var mongoose = require("mongoose");
var user = require("./app/users/controller/user.controller");
mongoose.connect('mongodb://localhost/e-commerce');

app.post("/user", user.addUser);
app.get("/user", user.getUser);
app.listen(5500);