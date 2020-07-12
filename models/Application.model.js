const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    uid: { type: String, required: true} ,
    company: { type: String, required: true },
    submitDate: { type: Date, default: new Date() },
    url: { type: String },
    jobTitle: { type: String, required: true },
    jobId: { type: String },
    status: { type: Number , default: 0 } //0 = not submitted, 1 = submitted, 2 = interviewing, 3 = offer, 4 = accepted, 5 = rejected
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);