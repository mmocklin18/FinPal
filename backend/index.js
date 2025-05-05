require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); 

const plaidRoutes = require("./routes/plaidRoutes");
const openaiRoutes = require("./routes/openaiRoutes"); // Import OpenAI routes
const authRoutes = require("./routes/authRoutes")

app.use("/api/plaid", plaidRoutes);
app.use("/api/openai", openaiRoutes);
app.use("/api/auth/", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});
