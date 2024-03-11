const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    status: {
        type: String,
        default: 'Offline'
    },
    passing_year: {
        type: String,

    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)