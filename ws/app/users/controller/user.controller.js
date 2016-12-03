var express = require("express");
var restConfig = require("../../../config/restConfig.js");
var userModel = require("../model/user-query.model");
function UserController() {
    
}

UserController.prototype.init = function(app) {
    app.post(restConfig.prefix + "/user", userModel.addUser);
    app.post(restConfig.prefix + "/user/checkEmail", userModel.findEmail);
    app.post(restConfig.prefix + "/user/login", userModel.userLogin);
    app.get(restConfig.prefix + "/user", userModel.getUser);
    app.get(restConfig.prefix + "/user/:id", userModel.getUserById);
    app.put(restConfig.prefix + "/user/:id", userModel.updateUser);
    app.delete(restConfig.prefix + "/user/:id", userModel.deleteUser);
}

module.exports = UserController;