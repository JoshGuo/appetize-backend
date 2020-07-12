const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    applications: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);