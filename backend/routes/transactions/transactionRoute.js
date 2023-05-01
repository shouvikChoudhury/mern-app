const express = require("express");

const {
    createTransactionCtrl,
    getTransactionsCtrl,
    getTransactionCtrl,
    deleteTransactionCtrl,
    updateTransactionCtrl,
} = require("../../controllers/transactions/transactionCtrl");

const isLogin = require("../../middlewares/isLogin");

const transactionRoute = express.Router();

//POST/api/v1/transactions
transactionRoute.post("/", isLogin, createTransactionCtrl);

//GET/api/v1/transactions
transactionRoute.get("/", getTransactionsCtrl);

//GET/api/v1/transactions/:id
transactionRoute.get("/:id", getTransactionCtrl);

//DELETE/api/v1/transactions/:id
transactionRoute.delete("/:id", deleteTransactionCtrl);

//PUT/api/v1/transactions/:id
transactionRoute.put("/:id", updateTransactionCtrl);

module.exports = transactionRoute;
