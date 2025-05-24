const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    userId: {type: String, ref:"User", required: true, unique: true},
    monthlyIncome: { type: Number, required: true },
    allocations: { type: Map, of: Number, required: true }
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
module.exports = User;