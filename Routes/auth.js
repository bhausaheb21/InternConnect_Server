// const User = require("../Model/User");
const express = require('express');
const { signUp, logIn } = require('../Controller/auth');
const { check, body } = require('express-validator')

const router = express.Router()

router.post('/', [
    check('email', "Please Enter Correct Email").isEmail().normalizeEmail({all_lowercase:true}).trim(),
    body('password', "Password is too Short").isLength({ min: 5, max: 30 })], logIn)

router.put('/signup', (req, res, next) => {
    console.log("request to Signup");
    next();
},
    [
        check('email', "Please Enter Correct Email").isEmail().normalizeEmail({ all_lowercase: true }).trim(),
        body('password', "Password is too Short").isLength({ min: 8, max: 30 }),
        body('firstName', "First name is Mandatory").isLength({ min: 3, max: 30 })]
    , signUp)

module.exports = router