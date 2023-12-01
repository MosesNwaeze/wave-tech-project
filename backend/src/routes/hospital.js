const express = require('express');
const hospitalController = require("../controller/hospital-controller");

const hospitalRouter = express.Router();


hospitalRouter.get("/hospital",hospitalController);

module.exports = hospitalRouter;