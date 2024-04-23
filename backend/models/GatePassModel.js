const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }
}, { collection: 'gate_passes' });

module.exports = mongoose.model('Gatepass', feedbackSchema);