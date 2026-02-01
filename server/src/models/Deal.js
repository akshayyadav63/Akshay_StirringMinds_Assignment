const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    partnerName: {
        type: String,
        required: [true, 'Please add a partner name'],
    },
    title: {
        type: String,
        required: [true, 'Please add a deal title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Cloud', 'Marketing', 'Analytics', 'Productivity', 'Design', 'Other'],
    },
    benefit: {
        type: String,
        required: [true, 'Please add benefit details (e.g. 20% off)'],
    },
    accessLevel: {
        type: String,
        required: true,
        enum: ['public', 'restricted'],
        default: 'public',
    },
    logoUrl: {
        type: String,
        default: 'https://via.placeholder.com/150',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Deal', DealSchema);
