var userModel = require("./user-collection.model");
var _ = require("lodash");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var encryptePassword = function(password, salt, callback) {
    console.log(salt)
    crypto.pbkdf2(password, salt, 100000, 512, 'sha512', function(err, key) {
        if(err)
            throw err;
        var hash = key.toString("hex");
        callback(hash)
    });
}
module.exports.getUser = function(req, res, next) {
    var reqCookie = req.headers["x-token"];
    var resCookie = req.cookies;
    console.log(reqCookie, resCookie)
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
    encryptePassword(req.body.passowrd, req.body.email, function(hash) {
        req.body.passowrd = hash;
        console.log(hash)
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
module.exports.userLogin = function(req, res) {
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
                    //var token = base64url(buffer.toString('hex'));
                    //res.cookie("x-token", token, { maxAge: 5000, httpOnly: true })
                    var token = jwt.sign({mail: doc.email}, "secretpass", {expiresIn: 60});
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