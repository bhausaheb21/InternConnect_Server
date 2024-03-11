const { validationResult } = require("express-validator");
const User = require("../Model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


exports.logIn = async (req, res, next) => {
    try {
        const errors = validationResult(req).array()
        if (errors.length > 0) {
            const error = new Error('Validation Failed');
            error.code = 422;
            throw err
        }
        const { email, password } = req.body;
        // console.log(email, password);
        const user = await User.findOne({ email: email })

        if (!user) {
            const error = new Error("User Not Found");
            error.code = 403;
            throw error;
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            const error = new Error("Wrong Password");
            error.code = 403;
            throw error;
        }

        const token = jwt.sign({ _id: user._id, name: user.firstName, email: user.email }, process.env.SECRET_KEY, { expiresIn: '2d' })
        return res.status(200).json({
            token, name: user.firstName, email: user.email
        })

    }
    catch (err) {
        let code = 500;
        if (err.code) {
            code = err.code;
        }
        return next(err);
    }

}
exports.signUp = async (req, res, next) => {
    try {
        const { firstName, email, password } = req.body;
        const errors = validationResult(req).array();
        console.log(req.body);

        if (errors.length > 0) {
            const error = new Error("Validation failed");
            error.code = 422;
            throw error;
        }

        const user = await User.findOne({ email })
        if (user) {
            const error = new Error("User already Exist");
            error.code = 409;
            throw error;
        }

        const hashedpass = await bcrypt.hash(password, 12);
        const newUser = new User({ firstName, email, password: hashedpass })
        const created = await newUser.save();

        return res.status(201).json({
            message: "User created",
            _id: created._id
        })
    }
    catch (err) {
        let code = 500;
        if (err.code) {
            code = err.code
        }
        return next(err)
    }
}