const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const tripSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sp"
    },
    commuter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commuter",
        required: true
    },
    pickUp: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price_est: {
        type: Number
    },
    price_act: {
        type: Number
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    advanceBooking: {
        type: Boolean,
        required: true
    }
});

module.exports = Trip = mongoose.model("Trip", tripSchema);
