var express = require("express");
var app = express();
var mongoose = require("mongoose");
var user = require("./app/users/controller/user.controller");
mongoose.connect('mongodb://localhost/e-commerce');


user.addUser();
app.listen(3000);