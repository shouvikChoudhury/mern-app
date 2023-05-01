const express = require("express");

const {
    registerUserCtrl,
    userLoginCtrl,
    userProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl,
} = require("../../controllers/users/userCtrl");

const isLogin = require("../../middlewares/isLogin");

const userRoute = express.Router();

//POST/api/v1/users/register
userRoute.post("/register", registerUserCtrl);

//POST/api/v1/users/login
userRoute.post("/login", userLoginCtrl);

//GET/api/v1/users/profile
userRoute.get("/profile/", isLogin, userProfileCtrl);

//DELETE/api/v1/users
userRoute.delete("/", isLogin, deleteUserCtrl);

//PUT/api/v1/users/
userRoute.put("/", isLogin, updateUserCtrl);

module.exports = userRoute;
