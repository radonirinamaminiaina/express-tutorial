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
    app.post("/user", function(req, res) {
        console.log(req)
        //userModel.insert()
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