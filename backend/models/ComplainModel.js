const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complainSchema = new Schema({
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
    }
}, { collection: "complains" });

module.exports = mongoose.model('Complain', complainSchema);