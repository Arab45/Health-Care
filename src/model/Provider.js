const mongoose = require('mongoose');
const Schema = mongoose.Schema

const providerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }, 
    specialization: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Provider', providerSchema);