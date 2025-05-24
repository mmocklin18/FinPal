const express = require("express");
const axios = require("axios");
require("dotenv").config();

const Budget = require("../models/Budget");
const verifyToken = require("../middleware/auth");

const router = express.Router();


//POST method for onboarding
router.post("/", verifyToken, async (req, res) => {
  const userId  = req.user.userId; 
  const { monthlyIncome, allocations } = req.body;

  if (!monthlyIncome || isNaN(monthlyIncome)) {
    return res.status(400).json({ error: "Invalid income" });
  }

  try {
    const existing = await Budget.findOne({ userId });
    if (existing) {
      return res.status(400).json({ error: "Budget already exists" });
    }

    const newBudget = await Budget.create({ userId, monthlyIncome, allocations });
    res.status(201).json(newBudget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//Update monthly income
router.patch("/income", verifyToken, async (req, res) => {
    const { monthlyIncome } = req.body;
    const userId = req.user.userId;

    //check valid income
    if (!monthlyIncome || isNaN(monthlyIncome)) {
        return res.status(400).json({ error: "Invalid income" });
    }

    //update database
    try {
        const result = await Budget.updateOne({userId}, {$set : {monthlyIncome}});
        res.status(200).json({ message: "Income updated" });
        console.log("Mongo update result:", result);


    } catch (err) {
        console.error("Income update error:", err);
        res.status(500).json({ error: "Server error" });
    }

});

//Update budget allocations
router.patch("/allocations", verifyToken, async (req, res) => {
    const { allocations } = req.body;
    const userId = req.user.userId;

    //check valid income
    if (!allocations){
        return res.status(400).json({ error: "Invalid allocations" });
    }

    //update database
    try {
        const result = await Budget.updateOne({userId}, {$set : {allocations}});
        res.status(200).json({ message: "Allocations updated" });
        console.log("Mongo update result:", result);


    } catch (err) {
        console.error("Income update error:", err);
        res.status(500).json({ error: "Server error" });
    }

});

//GET current monthly income from db
router.get("/", verifyToken, async (req, res) => {
    const userId  = req.user.userId;
    try {
        const budget = await Budget.findOne({userId});

        if (!budget) {
            return res.status(404).json({ error: "Budget not found" });
        }

        return res.json({
            monthlyIncome: budget.monthlyIncome,
            allocations: budget.allocations,
        });
        
    } catch (err) {
        console.error("ERROR getting income from MongoDB",err);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
