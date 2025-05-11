const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accessToken: {type: String}
});

const User = mongoose.model("User", UserSchema);
module.exports = User;