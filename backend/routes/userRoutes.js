const express = require("express");
const axios = require("axios");
require("dotenv").config();

const User = require("../models/User");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.patch("/income", verifyToken, async (req, res) => {
    const { monthlyIncome } = req.body;
    const userId = req.user.userId;

    //check valid income
    if (!monthlyIncome || isNaN(monthlyIncome)) {
        return res.status(400).json({ error: "Invalid income" });
    }

    //update database
    try {
        const result = await User.updateOne({userId}, {$set : {monthlyIncome}});
        res.status(200).json({ message: "Income updated" });
        console.log("Mongo update result:", result);


    } catch (err) {
        console.error("Income update error:", err);
        res.status(500).json({ error: "Server error" });
    }

});

router.get("/income", verifyToken, async (req, res) => {
    const userId  = req.user.userId;
    try {
        const user = await User.findOne({userId});

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({monthlyIncome: user.monthlyIncome });
        
    } catch (err) {
        console.error("ERROR getting income from MongoDB",err);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
