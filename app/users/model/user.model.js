var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userModel = new Schema({
    name: String,
    lastname: String,
    phone: String,
    email: {
        type: String,
        unique: true,
        index: true,
        trim: true
    },
    passowrd: String,
    profil_pic: [],
    role: [],
    temporary_role: [],
    absent: {
        status: Boolean,
        count: Number
    }
});

module.exports = mongoose.model('user', userModel);