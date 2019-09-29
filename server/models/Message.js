const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const messageSchema = new Schema({
    message_id: mongoose.Schema.Types.ObjectId,
    commuter_id: mongoose.Schema.Types.ObjectId,
    sp_id: mongoose.Schema.Types.ObjectId,
    messageThread: [
        {
            senderID: { type: mongoose.Schema.Types.ObjectId, required: true },
            text: { type: String, required: true },
            timeStamp: { type: Date, required: true, default: new Date() }
        }
    ]
});

module.exports = Message = mongoose.model("Message", messageSchema);
