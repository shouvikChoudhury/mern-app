const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: [
            "Savings", "Investment", "Checking", "Credit Card", "Building", "School", "Project", "Utilities", "Travel", "Personal", "Groceries", "Entertainment", "Loan", "Cash Flow", "Uncategorized", "Education"
        ],
        required: true,
    },
    initialBalance: {
        type: Number,
        default: 0,
    },
    notes: {
        type: String,
        required: true,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;