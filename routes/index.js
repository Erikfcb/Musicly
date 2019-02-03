
const express = require('express')
const router = express.Router();

const signupRouter = require("./signUp");
const loginRouter = require("./login");
const generalRouter = require("./general");

router.use(signupRouter);
router.use(loginRouter);
router.use(generalRouter);

module.exports = router
