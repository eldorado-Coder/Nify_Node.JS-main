const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Contact_number: Number ,
    Password:String,
    Age: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);