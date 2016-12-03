var express = require("express");
var app = express();
var mongoose = require("mongoose");
var UserController = require("./app/users/controller/user.controller");
var methodOverride  = require("method-override");
var bodyParser = require("body-parser");
var cros = require("./config/header.js");
var user = new UserController();
mongoose.connect('mongodb://localhost/e-commerce');

app.disable('etag');
app.use(function(req, res, next) {
    cros(res);
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

user.init(app);

process.on("SIGTERM ", function() {

});
app.listen(process.env.port || 3200);