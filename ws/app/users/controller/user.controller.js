var express = require("express");
var restConfig = require("../../../config/restConfig.js");
var user = require("../model/user-query.model");
function UserController() {
    
}

UserController.prototype.init = function(app) {
    app.post(restConfig.prefix + "/user", user.create);
    app.post(restConfig.prefix + "/user/checkEmail", user.findByEmail);
    app.post(restConfig.prefix + "/user/login", user.login);
    app.get(restConfig.prefix + "/user", user.findAll);
    app.get(restConfig.prefix + "/user/:id", user.findById);
    app.put(restConfig.prefix + "/user/:id", user.update);
    app.delete(restConfig.prefix + "/user/:id", user.delete);
}

module.exports = UserController;