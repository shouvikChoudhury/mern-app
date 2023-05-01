const express = require('express')
const cors = require("cors")
const globalErrHandler = require("./middlewares/globalErrHandler");
require("./config/dbConnect");
const accountRoute = require("./routes/accounts/accountRoute");
const transactionRoute = require("./routes/transactions/transactionRoute");
const userRoute = require("./routes/users/userRoute");

const app = express();

//middlewares to pass incoming data
app.use(express.json());

//middlware to give client access of server
app.use(cors())

//user routes
app.use("/api/v1/users", userRoute);

//account routes
app.use("/api/v1/accounts", accountRoute);

//transaction routes
app.use("/api/v1/transactions", transactionRoute);

//Error handlers
app.use(globalErrHandler);

//listen to server
app.listen(4000, console.log("Server is running on port 4000"))