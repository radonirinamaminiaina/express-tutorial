var express = require("express");
var app = express();
var mongoose = require("mongoose");
var user = require("./app/users/controller/user.controller");
var methodOverride  = require("method-override");
var bodyParser = require("body-parser");
var cros = require("./config/header.js");
var restConfig = require("./config/restConfig.js");

mongoose.connect('mongodb://localhost/e-commerce');

app.disable('etag');
app.use(function(req, res, next) {
    cros(res);
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.post(restConfig.prefix + "/user", user.addUser);
app.post(restConfig.prefix + "/user/checkEmail", user.findEmail);
app.get(restConfig.prefix + "/user", user.getUser);
app.get(restConfig.prefix + "/user/:id", user.getUserById);
app.put(restConfig.prefix + "/user/:id", user.updateUser);
app.delete(restConfig.prefix + "/user/:id", user.deleteUser);

process.on("SIGTERM ", function() {

});
app.listen(process.env.port || 3200);