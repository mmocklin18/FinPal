const express = require("express");
const axios = require("axios");
require("dotenv").config();
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
const { assignIcon } = require('../utils/assignIcon');
const { assignCat } = require('../utils/assignCat');


const router = express.Router();

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;
const PLAID_BASE_URL = `https://${PLAID_ENV}.plaid.com`;

//create initial link token
router.get("/create-link-token", verifyToken, async (req, res) => {
    console.log(" Backend hit: GET /plaid/create-link-token");

    try {
        const plaidResponse = await axios.post(`${PLAID_BASE_URL}/link/token/create`, {
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            user: { client_user_id: req.user.userId },
            client_name: "FinPal",
            products: ["transactions"],
            country_codes: ["US"],
            language: "en",
        });
        
        console.log("Plaid Response:", plaidResponse.data); // Debugging log

        res.json({ link_token: plaidResponse.data.link_token });
    } catch (error) {
        console.error("Plaid API Error:", error.response?.data || error.message);

        res.status(500).json({
            error: error.response?.data || "Unknown error",
        });
    }
});

//exchange public token for accesss token
router.post("/exchange-public-token", verifyToken, async (req, res) => {
    try {
        const plaidResponse = await axios.post(`${PLAID_BASE_URL}/item/public_token/exchange`, {
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            public_token: req.body.public_token,
        });

        const access_token = plaidResponse.data.access_token;
        const item_id = plaidResponse.data.item_id;
        const userId = req.user.userId;

        await User.updateOne(
            { userId },
            {
                $set: {
                    accessToken: access_token,
                    itemId: item_id,
                },
            },
            {upsert: true}   
        );

        console.log("Access Token:", access_token);
        res.json({ success: true });
    } catch (err) {
        console.error("Plaid public token exchange error", err)
        res.status(500).json({ error: "Failed to exchange token" });
    }
});


//Get transactions data
router.post("/transactions", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findOne({userId});
       
        if (!user || !user.accessToken) {
            return res.status(400).json({ error: "Access token not found" });
 
        }
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1); //first day of current month
        const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //last day of current month

        const start = startDate.toISOString().split("T")[0];  
        const end = endDate.toISOString().split("T")[0]; 

        const plaidResponse = await axios.post(`${PLAID_BASE_URL}/transactions/get`, {
            "client_id": PLAID_CLIENT_ID,
            "secret": PLAID_SECRET,
            "access_token": user.accessToken,
            "start_date": start,
            "end_date": end,
            "options": {
                "count": 100,
                "offset": 0,
                "include_personal_finance_category": true
            },
        });

        const formattedRes = plaidResponse.data.transactions.map((transaction) => ({
            id: transaction.transaction_id,
            category: assignCat(transaction.personal_finance_category?.primary),
            title: transaction.name,
            amount: transaction.amount,
            date: transaction.date,
            location: transaction.location?.city || "Online",
            icon: assignIcon(transaction.personal_finance_category?.primary)
        }));

        res.json(formattedRes);

    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Failed fetching transactions"});
    }

});

module.exports = router;