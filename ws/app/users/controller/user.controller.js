var express = require("express");
var userModel = require("../model/user.model");
var _ = require("lodash");

var app = express();
module.exports.getUser = function(req, res, next) {
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
module.exports.getUserById = function(req, res, next) {
    userModel.findById(req.params.id, function(err, data) {
        if (err) {
            res.render('error');
            //res.status(404);
            return;
        }
        var dataResponse = {
            code: 200,
            status: "ok",
            data: data
        };
        res.json(dataResponse);
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
module.exports.deleteUser = function(req, res) {
    userModel.remove(
        {_id: req.params.id}, 
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                status: "ok",
                code: 200,
                message: "Data deleted successfully"
            })
        }
    );
}
module.exports.updateUser = function(req, res) {
    userModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
        function(err, data) {
            if (err) {
                res.send(err);
            }
            res.json({
                status: "ok",
                code: 200,
                message: "Data saved successfully"
            });
        }
    );
}