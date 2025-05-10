//create router
const express = require("express");
const router = express.Router();

//random id
const { v4: uuidv4 } = require("uuid");

//User schema
const User = require("../models/User");


//import dependencies for hashing and session management
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//secret JWT key
const JWT_SECRET = process.env.JWT_SECRET || "testKey";

//REGISTER ROUTE
router.post("/register", async (req, res) => {
const {email, password} = req.body;

if (!email || !password) {
    return res.status(400).json({error: "Email and password are required"});
}

//check email for user does not exist
const existingUser = await User.findOne({email});

if (existingUser) {
    return res.status(400).json({error: "Email already exists in database"});
}

//hash password
const hashed = await bcrypt.hash(password, 10);

//Create new user object
const newUser = {
    userId: uuidv4(),
    email: email,
    password: hashed
}

//add user to db
await User.create(newUser);

//create jwt token
const token = jwt.sign(
    { userId: newUser.userId },
    JWT_SECRET,
    { expiresIn: "7d" }
);

//return response to user
res.json({
    token,
    user: {
     userId: newUser.userId,
     email: newUser.email,   
    }
});

});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
const {email, password} = req.body;

if (!email || !password) {
    return res.status(400).json({error: "Email and password are required"});
}

const existingUser = await User.findOne({email});

if (!existingUser) {
    return res.status(400).json({error: "Email does not exist in database"});
}

const checkPass = await bcrypt.compare(password, existingUser.password)
if (!checkPass) {
    return res.status(400).json({error: "Incorrect password"});
}

const token = jwt.sign(
    { userId: existingUser.userId },
    JWT_SECRET,
    { expiresIn: "7d" }
);

res.json({
    token,
    user: {
        userId: existingUser.userId,
        email: existingUser.email
    }
});


});

module.exports = router;