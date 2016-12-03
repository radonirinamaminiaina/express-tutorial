var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var UserController = require("./app/users/controller/user.controller");
var methodOverride  = require("method-override");
var bodyParser = require("body-parser");
var cros = require("./config/header.js");
var user = new UserController();
var jwt = require("jsonwebtoken");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/e-commerce');

app.use(cookieParser());
app.disable('etag');
app.use(function(req, res, next) {
    var token = req.headers["x-token"];
    if(token) {
        jwt.verify(token, "secretpass", function(err, decoded) {
            cros(res);
            if(err) {
                res.status(401).send("error");
                res.end();
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        cros(res);
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

user.init(app);

process.on("SIGTERM ", function() {

});
app.listen(process.env.port || 3200);