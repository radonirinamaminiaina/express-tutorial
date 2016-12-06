var express = require("express");
var restConfig = require("../../../config/restConfig.js");
var user = require("../model/user-query.model");
var cros = require("../../../config/header.js");
var jwt = require("jsonwebtoken");
/**
 * UserController
 * 
 * Execute our model
 * @class
 */
function UserController() {}
/**
 * init
 * 
 * initialization
 * 
 * @param app {Object} express()
 */
UserController.prototype.init = function(app) {
    this.requestOptions(app);
    this.userRequest(app);
}
/**
 * requestOptions
 * 
 * send requestion options
 * 
 * @param app {Object} express()
 */
UserController.prototype.requestOptions = function(app) {
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
}
/**
 * userRequest
 * 
 * execute our model
 * 
 * @param app {Object} express()
 */
UserController.prototype.userRequest = function(app) {
    user.createAdmin();
    app.post(restConfig.prefix + "/user", user.create);
    app.post(restConfig.prefix + "/user/checkEmail", user.findByEmail);
    app.post(restConfig.prefix + "/user/login", user.login);
    app.get(restConfig.prefix + "/user", user.findAll);
    app.get(restConfig.prefix + "/user/:id", user.findById);
    app.put(restConfig.prefix + "/user/:id", user.update);
    app.delete(restConfig.prefix + "/user/:id", user.delete);
}

module.exports = UserController;