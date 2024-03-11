const mongoose = require('mongoose')

const internShipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "Work from Home"
    },
    start_date: {
        type: Date,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    },
    skills: [String],
    About: [String],
    no_of_opening: {
        type: Number,
        required: true
    }
    , postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applications: [
        {
            applicant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            status: {
                type: String,
                enum: ['Pending', 'Accepted', 'Rejected'],
                default: 'Pending',
            },
        },
    ],
}, { timestamps: true })

module.exports = mongoose.model('Internship',internShipSchema)