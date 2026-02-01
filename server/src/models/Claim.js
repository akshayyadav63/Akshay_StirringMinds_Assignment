const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    deal: {
        type: mongoose.Schema.ObjectId,
        ref: 'Deal',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    claimedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Claim', ClaimSchema);
