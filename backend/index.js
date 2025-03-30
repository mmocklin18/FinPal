require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); 

const plaidRoutes = require("./routes/plaidRoutes");
const openaiRoutes = require("./routes/openaiRoutes"); // Import OpenAI routes


app.use("/plaid", plaidRoutes);
app.use("/openai", openaiRoutes);

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});
