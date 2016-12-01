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
module.exports.findEmail = function(req, res, next) {
    console.log("into findEmail")
    userModel.findOne({email: req.body.email}, 'email', function(err, doc) {
        console.log(doc);
        res.json(doc);
    })
}
module.exports.addUser = function(req, res) {
    var dataUser = new userModel(req.body);
    dataUser.save(function(err) {
        if (err) {
            res.send(err);
            return;
        };
        res.json({
            status: "ok",
            code: 200,
            message: "User added"
        })
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
                return;
            }
            res.json({
                status: "ok",
                code: 200,
                message: "Data saved successfully"
            });
        }
    );
}