const express = require('express');
const loginController = require("../controller/auth/login");
const signupController = require("../controller/auth/signup");

const authRouter = express.Router();

authRouter.post("/login",loginController)
authRouter.post("/register",signupController);

module.exports = authRouter;