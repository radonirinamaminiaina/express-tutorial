var userModel = require("./user-collection.model");
var _ = require("lodash");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var config = require("../../../config/config");
/**
 * encryptePassword
 * 
 * create a salt to encrypte the password
 * 
 * @param password {String} 
 * @param salt {String} it the encrypte algorithm
 * @param callback {Function}
 */
var encryptePassword = function(password, salt, callback) {
    crypto.pbkdf2(password, salt, 100000, 512, 'sha512', function(err, key) {
        if(err)
            throw err;
        var hash = key.toString("hex");
        callback(hash)
    });
}
/**
 * detectRequestToken
 * 
 * Detect if x-token is present in the header request
 * 
 * @param req {Object} request header
 * @param res {Object} response header
 */
var detectRequestToken = function(req, res) {
    var reqCookie = req.headers["x-token"];
    if(!reqCookie) {
        res.status(401).end();
        return false;
    } else {
        return true;
    }
}
/**
 * User
 * 
 * user class to manage user action <get, post, put, delete>
 * @class
 * 
 */
var User = function() {}
/**
 * createAdmin
 * 
 * create user admin
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 * @param next {Function} pass to next middleware
 */
User.prototype.createAdmin = function(req, res) {
    encryptePassword(config.userAdmin.passowrd, config.userAdmin.email, function(hash) {
        config.userAdmin.passowrd = hash;
        userModel.findOneAndUpdate({email: config.userAdmin.email}, config.userAdmin, {upsert: true, new: true, setDefaultsOnInsert: true}, function(err, result) {
            if(err) return;
        })
    });
}
/**
 * findAll
 * 
 * Find all user
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 * @param next {Function} pass to next middleware
 */
User.prototype.findAll = function(req, res, next) {
    if(detectRequestToken(req, res)) {
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
};
/**
 * findById
 * 
 * Find user by id
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 * @param next {Function} pass to next middleware
 */
User.prototype.findById = function(req, res, next) {
    if(detectRequestToken(req, res)) {
        userModel.findById(req.params.id, function(err, data) {
            if (err) {
                res.send(err);
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
}
/**
 * findByEmail
 * 
 * Find user by email
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 * @param next {Function} pass to next middleware
 */
User.prototype.findByEmail = function(req, res, next) {
    if(detectRequestToken(req, res)) {
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
        });
    }
}
/**
 * create
 * 
 * create new user
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 */
User.prototype.create = function(req, res) {
    if(detectRequestToken(req, res)) {
        encryptePassword(req.body.passowrd, req.body.email, function(hash) {
            req.body.passowrd = hash;
            //req.body.role = ["admin"];
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
        });
    }
}
/**
 * login
 * 
 * user login
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 */
User.prototype.login = function(req, res) {
    encryptePassword(req.body.passowrd, req.body.email, function(hash) {
        userModel.findOne({email: req.body.email, passowrd: hash } , {passowrd: 0}, function(err, doc) {
            if(err)
                throw err;
            if(!doc) {
                res.json({
                    code: 404,
                    status: "ok",
                    message: "user not found"
                });
            } else {
                require('crypto').randomBytes(25, function(err, buffer) {
                    var token = jwt.sign({mail: doc.email}, "secretpass", {expiresIn: config.tokenExpiredTime});
                    doc = doc.toObject(doc);
                    doc.token = token;
                    res.json({
                        code: 200,
                        status: "ok",
                        data: doc
                    });
                });
            }
        })
    });
}
/**
 * update
 * 
 * update user
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 */
User.prototype.update = function(req, res) {
    if(detectRequestToken(req, res)) {
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
}
/**
 * delete
 * 
 * delete user
 * 
 * @param req {Object} request headers
 * @param res {Object} response headers
 */
User.prototype.delete = function(req, res) {
    if(detectRequestToken(req, res)) {
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
}

module.exports = new User();