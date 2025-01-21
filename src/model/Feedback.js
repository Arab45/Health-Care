const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider",
            required: true
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true
        },
        rating: {
            type: Number, 
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String
        },
        createAt: {
            type: Date,
            default: Date.now
        }
});

module.exports = mongoose.model("Feedback", feedbackSchema);