const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

//Creates a schema
const commuterSchema = new Schema({
    commuter_id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },

    pwdStatus: {
        type: Boolean,
        required: true
    },
    impairments: {
        physical: {
            crutch: {
                type: Boolean,
                default: false
            },
            wheelChair: {
                type: Boolean,
                default: false
            },
        },
        visual: {
            partial: {
                type: Boolean,
                default: false
            },
            total: {
                type: Boolean,
                default: false
            },
        },
        hearing: {
            partial: {
                type: Boolean,
                default: false
            },
            total: {
                type: Boolean,
                default: false
            },
        },
    },
    commuter_salt: {
        type: String,
        required: true
    },
    commuter_hash: {
        type: String,
        required: true
    }
});

commuterSchema.methods.setPassword = function (password) {
    // creating a unique salt for a particular commuter
    this.commuter_salt = crypto.randomBytes(16).toString("hex");

    // hashing commuter's salt and password with 1000 iterations, 64 length and sha512 digest

    this.commuter_hash = crypto
        .pbkdf2Sync(password, this.commuter_salt, 1000, 64, `sha512`)
        .toString(`hex`);
};

commuterSchema.methods.validPassword = function (password) {
    let hash = crypto
        .pbkdf2Sync(password, this.commuter_salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.commuter_hash === hash;
};

module.exports = Commuter = mongoose.model("Commuter", commuterSchema);