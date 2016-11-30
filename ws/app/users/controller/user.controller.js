var express = require("express");
var userModel = require("../model/user.model");
var cros = require("../../../config/header.js");

var app = express();

module.exports.getUser = function(req, res) {
    cros(res);
    userModel.find({}, function(err, data) {
        if(err)
            throw err;
        var dataResponse = {
            code: 200,
            status: "ok",
            data: data
        }
        res.json(dataResponse);
    });
}
module.exports.getUserById = function() {
    app.get("/user/:id", function(req, res) {
        
    });
}
module.exports.addUser = function(req, res) {
    var dataUser = new userModel({
        name: "Radonirina 2",
        lastname: "Maminiaina 2",
        phone: "+261334190828",
        email: "rado93devweb2@gmail.com",
        passowrd: "123456",
        profil_pic: ["profile.jpg", "profile2.jpg", "profile3.jpg"],
        role: ["admin", "validator"],
        temporary_role: [],
        absent: {
            status: false,
            count: 12
        }
    })
    dataUser.save(function(err) {
        if (err) throw err;
        console.log("Data save successfully");
    });
}
module.exports.deleteUser = function() {
    app.delete("/user/:id", function() {

    });
}
module.exports.updateUser = function() {
    app.put("/user/:id", function(req, res) {

    });
}