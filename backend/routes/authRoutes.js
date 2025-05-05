//create router
const express = require("express");
const router = express.Router();

//import dependencies for hashing and session management
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//replace with real DB later
const users = [];

//secret JWT key
const JWT_SECRET = process.env.JWT_SECRET || "testKey";

//REGISTER ROUTE
router.post("/register", async (req, res) => {
const {email, password} = req.body;

if (!email || !password) {
    return res.status(400).json({error: "Email and password are required"});
}

//check email for user does not exist
const existingUser = users.find((user) => user.email === email);

if (existingUser) {
    return res.status(400).json({error: "Email already exists in database"});
}

//hash password
const hashed = await bcrypt.hash(password, 10);

//Create new user object
const newUser = {
    id: Date.now().toString(),
    email: email,
    password: hashed
}

//add user to db
users.push(newUser);

//create jwt token
const token = jwt.sign(
    { id: newUser.id },
    JWT_SECRET,
    { expiresIn: "7d" }
);

//return response to user
res.json({
    token,
    user: {
     id: newUser.id,
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

const existingUser = users.find((u) => u.email === email);

if (!existingUser) {
    return res.status(400).json({error: "Email does not exist in database"});
}

const checkPass = await bcrypt.compare(password, existingUser.password)
if (!checkPass) {
    return res.status(400).json({error: "Incorrect password"});
}

const token = jwt.sign(
    { id: existingUser.id },
    JWT_SECRET,
    { expiresIn: "7d" }
);

res.json({
    token,
    user: {
        id: existingUser.id,
        email: existingUser.email
    }
});


});