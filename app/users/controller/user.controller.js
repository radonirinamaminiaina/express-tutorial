var express = require("express");
var userModel = require("../model/user.model");

var app = express();

module.exports.getUser = function() {
    app.get("/user", function(req, res) {
        userModel.find({}, function(err, data) {
            if(err)
                throw err;
            res.json(data);
        });
    });
}
module.exports.getUserById = function() {
    app.get("/user/:id", function(req, res) {
        
    });
}
module.exports.addUser = function() {
    app.get("/user", function(req, res) {
        console.log(req)
        //userModel.insert()
        var dataUser = new userModel({
            name: "Radonirina",
            lastname: "Maminiaina",
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
        userModel.insert(function(err) {
            if (err) throw err;
            console.log("Data save successfully");
        });
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