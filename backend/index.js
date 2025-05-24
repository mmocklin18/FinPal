require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
connectDB();

app.use(express.json());
app.use(cors()); 



const plaidRoutes = require("./routes/plaidRoutes");
const openaiRoutes = require("./routes/openaiRoutes"); 
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");


app.use((req, res, next) => {
    console.log("Received:", req.method, req.url);
    next();
  });

app.use("/api/plaid", plaidRoutes);
app.use("/api/openai", openaiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);


app.get("/", (req, res) => {
    res.send("Backend is working!");
});


app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});
