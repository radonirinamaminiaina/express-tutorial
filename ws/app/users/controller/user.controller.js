var express = require("express");
var userModel = require("../model/user.model");
var _ = require("lodash");
var crypto = require("crypto");
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
    userModel.findOne({email: req.body.email}, 'email', function(err, doc) {
        var validDoc;
        if(err) {
            res.send(err);
            return;
        }
        if( ! doc) {
            validDoc = {
                status: "ok",
                code: 200,
                message: "Valid entry"
            };
        } else {
            validDoc = {
                status: "ok",
                code: 409,
                message: "Duplicate entry"
            };
        }
        res.json(validDoc);
    })
}
module.exports.addUser = function(req, res) {
    var secret = "radonirinamaminiainaisafrontenddevelopper";
    var hash = crypto.createHmac("sha256", secret).update(req.body.email).digest("hex");    
    crypto.pbkdf2(req.body.passowrd, req.body.email, 100000, 512, 'sha512', function(err, key) {
        console.log(key.toString('hex'));
        req.body.passowrd = hash;
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
            });
            
        });
    })
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
            });
            
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