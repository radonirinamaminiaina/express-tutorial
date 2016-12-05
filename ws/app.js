var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var UserController = require("./app/users/controller/user.controller");
var methodOverride  = require("method-override");
var bodyParser = require("body-parser");
var user = new UserController();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/e-commerce');

app.use(cookieParser());
app.disable('etag');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

user.init(app);

process.on("SIGTERM ", function() {

});
app.listen(process.env.port || 3200);