const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { collection: 'inquiries' });

module.exports = mongoose.model('Inquiry', inquirySchema);