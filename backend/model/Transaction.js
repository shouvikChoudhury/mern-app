const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ["Income", "Expenses"],
        required: true,
    },
    category: {
        type: String,
        enum: [
            "Food", "Transportation", "Entertainment", "Shopping", "Building", "Bills", "Utilities", "Travel", "Personal", "Groceries", "Uncategorized", "Education", "Health"
        ],
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    notes: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;