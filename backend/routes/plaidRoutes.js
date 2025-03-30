const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;
const PLAID_BASE_URL = `https://${PLAID_ENV}.plaid.com`;


router.post("/create_link_token", async (req, res) => {
    console.log("Received request for /create_link_token");

    try {
        const plaidResponse = await axios.post(`${PLAID_BASE_URL}/link/token/create`, {
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            user: { client_user_id: "user-id" },
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

module.exports = router;