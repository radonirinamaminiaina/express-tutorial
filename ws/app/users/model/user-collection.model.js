var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userModel = new Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    lastname: {
        type: String,
        index: true,
        required: true
    },
    phone: String,
    email: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        required: true
    },
    passowrd: {
        type: String,
        required: true
    },
    profil_pic: [],
    role: [],
    temporary_role: [],
    absent: {
        status: Boolean,
        count: Number
    }
} , {
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('users', userModel);