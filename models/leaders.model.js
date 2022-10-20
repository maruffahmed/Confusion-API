const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: false
    }
}, {
    timestamps: true
});

const Leaders = mongoose.model("Leader", leaderSchema);
module.exports = Leaders;