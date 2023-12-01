const express = require('express');
const logger = require('morgan');
const cors = require("cors")


const authRouter = require("./routes/auth");
const hospitalRouter = require("./routes/hospital");

const  app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
app.use("/api/v1",authRouter);
app.use("/api/v1",hospitalRouter);

module.exports = app;
