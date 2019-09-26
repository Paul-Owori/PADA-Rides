const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

//Creates a schema
const spSchema = new Schema({
    sp_id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    permitNumber: {
        type: Number,
        required: true
    },
    pwdTrained: {
        type: Boolean,
        required: true
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
    },
    currentAvailability: {
        type: Boolean,
        default: false
    },
    vehicle: {
        vehicleType: {
            type: String,
            required: true
        },
        regNumber: {
            type: String,
            required: true
        },
        modified: {
            type: Boolean,
            required: true
        },
    },
    sp_salt: {
        type: String,
        required: true
    },
    sp_hash: {
        type: String,
        required: true
    }
});

spSchema.methods.setPassword = function (password) {
    // creating a unique salt for a particular sp
    this.sp_salt = crypto.randomBytes(16).toString("hex");

    // hashing sp's salt and password with 1000 iterations, 64 length and sha512 digest

    this.sp_hash = crypto
        .pbkdf2Sync(password, this.sp_salt, 1000, 64, `sha512`)
        .toString(`hex`);
};

spSchema.methods.validPassword = function (password) {
    let hash = crypto
        .pbkdf2Sync(password, this.sp_salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.sp_hash === hash;
};

module.exports = Sp = mongoose.model("Sp", spSchema);