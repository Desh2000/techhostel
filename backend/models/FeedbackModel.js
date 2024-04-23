const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    }
}, { collection: 'feedbacks' });

module.exports = mongoose.model('Feedback', feedbackSchema);