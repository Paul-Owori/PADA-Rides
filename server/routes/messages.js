const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../models/Message");

// Handling GET requests for all messages
router.get("/", (req, res, next) => {
    Message.find()
        .exec()
        .then(messages => {
            if (messages.length > 0) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({
                    message: "No entries found"
                });
            }
        })
        .catch(err => {
            console.log("Error getting messages at '/messages'");
            res.status(500).json({
                message: "Error getting messages at '/messages'"
            });
        });
});

// Handling GET requests for a single message by ID
router.get("/:messageID", (req, res, next) => {
    const messageID = req.params.messageID;

    Message.findById(messageID)
        .exec()
        .then(message => {
            if (message) {
                res.status(200).json(message);
            } else {
                console.log("404 error, that message does not exist");
                res.status(404).json({
                    message: "That message does not exist"
                });
            }
        })
        .catch(err => {
            console.log(`Error getting message with ID ${messageID}`, err);
            res.status(500).json({
                message: `Error getting message with ID ${messageID}`,
                error: err
            });
        });
});

// Handling creating a message object and storing it in the database
router.post("/create", (req, res, next) => {
    console.log("MESSAGE RECEIVED BY BACKEND==>>", req.body);
    let newMessage = req.body;

    //This creates a new message object in the database using the message model
    const message = new Message(newMessage);

    //let admin = new Admin();

    // message.firstName = req.body.firstName;
    // message.lastName = req.body.lastName;
    // message.email = req.body.email;
    // message.phoneNumber = req.body.phoneNumber;
    // message.pwdStatus = req.body.pwdStatus;
    // message.impairments = req.body.impairments;
    // message.setPassword(req.body.password);

    //This saves the message in the database
    message
        .save()
        .then(result => {
            console.log(`Successfuly saved ${message}`);
            res.status(201).json({
                message: message,
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `Error posting message ${message} at '/messages/create'`,
                error: err
            });
        });
});

//Handling updating one message
router.patch("/:messageID", (req, res, next) => {
    const messageID = req.params.messageID;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Message.updateMany(
        {
            _id: messageID
        },
        {
            $set: updateOps
        }
    )
        .exec()
        .then(result => {
            res.status(200).json({
                result,
                message: `Success updating message with id ${messageID}`
            });
        })
        .catch(err => {
            console.log(`Error updating message with id ${messageID}`, error);
            res.status(500).json({
                error: err
            });
        });
});

//Handling deleting a single message
router.delete("/:messageID", (req, res, next) => {
    const messageID = req.params.messageID;

    Message.deleteOne({
        _id: messageID
    })
        .exec()
        .then(result => {
            console.log(`Message with ID ${messageID} successfuly deleted`);
            res.status(200).json({
                message: `Message with ID ${messageID} successfuly deleted`,
                result
            });
        })
        .catch(err => {
            console.log(`Error deleting message with ID ${messageID}`);
            res.status(500).json({
                message: `Error deleting message with ID ${messageID}`,
                error: err
            });
        });
});

module.exports = router;
