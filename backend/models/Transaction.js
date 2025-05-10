const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    transactionId: { type: String, required: true, unique: true }, //Plaid id
    name: String, 
    amount: Number,
    date: String,
    category: [String],
    pending: Boolean,

});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;