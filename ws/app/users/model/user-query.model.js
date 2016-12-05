var userModel = require("./user-collection.model");
var _ = require("lodash");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var config = require("../../../config/config");
var encryptePassword = function(password, salt, callback) {
    crypto.pbkdf2(password, salt, 100000, 512, 'sha512', function(err, key) {
        if(err)
            throw err;
        var hash = key.toString("hex");
        callback(hash)
    });
}
var User = function() {}
User.prototype.findAll = function(req, res, next) {
    var reqCookie = req.headers["x-token"];
    if(reqCookie) {
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
    } else {
        res.status(401).end();
    }
};
User.prototype.findById = function(req, res, next) {
    var reqCookie = req.headers["x-token"];
    if(reqCookie) {
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
    } else {
        res.status(401).end();
    }
}
User.prototype.findByEmail = function(req, res, next) {
    var reqCookie = req.headers["x-token"];
    if(reqCookie) {
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
    }  else {
        res.status(401).end();
    }
}
User.prototype.create = function(req, res) {
    var reqCookie = req.headers["x-token"];
    if(reqCookie) {
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
    } else {
        res.status(401).end();
    }
}
User.prototype.login = function(req, res) {
    encryptePassword(req.body.passowrd, req.body.email, function(hash) {
        userModel.findOne({ email: req.body.email, passowrd: hash } , {passowrd: 0}, function(err, doc) {
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
User.prototype.update = function(req, res) {
    var reqCookie = req.headers["x-token"];
    if(reqCookie) {
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
    } else {
        res.status(401).end();
    } 
}
User.prototype.delete = function(req, res) {
    var reqCookie = req.headers["x-token"];
    if(reqCookie) {
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
    } else {
        res.status(401).end();
    }
}

module.exports = new User();