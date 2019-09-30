const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Sp = require("../models/Sp"); //sp =  (service provider)

// Handling GET requests for all sps
router.get("/", (req, res, next) => {
    Sp.find()
        .exec()
        .then(sps => {
            if (sps.length > 0) {
                res.status(200).json(sps);
            } else {
                res.status(404).json({
                    message: "No entries found"
                });
            }
        })
        .catch(err => {
            console.log("Error getting sps at '/sps'");
            res.status(500).json({
                message: "Error getting sps at '/sps'"
            });
        });
});

// Handling GET requests for a single sp by ID
router.get("/:spID", (req, res, next) => {
    const spID = req.params.spID;

    Sp.findById(spID)
        .exec()
        .then(sp => {
            if (sp) {
                res.status(200).json(sp);
            } else {
                console.log("404 error, that sp does not exist");
                res.status(404).json({
                    message: "That sp does not exist"
                });
            }
        })
        .catch(err => {
            console.log(`Error getting sp with ID ${spID}`, err);
            res.status(500).json({
                message: `Error getting sp with ID ${spID}`,
                error: err
            });
        });
});

// Handling creating a sp object and storing it in the database
router.post("/create", (req, res, next) => {
    console.log("SP RECEIVED BY BACKEND==>>", req.body);

    //This creates a new sp object in the database using the sp model
    const sp = new Sp();

    //let admin = new Admin();

    sp.firstName = req.body.firstName;
    sp.lastName = req.body.lastName;
    sp.email = req.body.email;
    sp.phoneNumber = req.body.phoneNumber;
    sp.permitNumber = req.body.permitNumber;
    sp.pwdTrained = req.body.pwdTrained;
    sp.vehicle = req.body.vehicle;
    sp.setPassword(req.body.password);

    //This saves the sp in the database
    sp.save()
        .then(result => {
            console.log(`Successfuly saved ${sp}`);
            res.status(201).json({
                sp: sp,
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `Error posting sp ${sp} at '/sps'`,
                error: err
            });
        });
});

// Handling logging in an sp
router.post("/login", (req, res, next) => {
    console.log("SP RECEIVED BY BACKEND==>>", req.body);

    //This creates a new sp object in the database using the sp model
    const spReceived = req.body;

    //let admin = new Admin();
    //receives two parameters, admin email and password
    Sp.findOne(
        {
            email: spReceived.email
        },
        function(err, sp) {
            if (sp === null) {
                console.log("No sp found");
                return res.status(404).send({
                    message: "sp not found."
                });
            } else {
                if (sp.validPassword(spReceived.password)) {
                    console.log("sp succesful login");
                    return res.status(200).send({
                        _id: sp._id,
                        firstName: sp.firstName,
                        lastName: sp.lastName,
                        email: sp.email,
                        phoneNumber: sp.phoneNumber,
                        currentAvailability: sp.currentAvailability
                    });
                } else if (!sp.validPassword(spReceived.password)) {
                    return res.status(404).send({
                        message: "wrong email or password."
                    });
                } else {
                    return res.status(500).send({
                        message: "Something went wrong, try logging in again"
                    });
                }
            }
        }
    );
});

//Handling updating one sp
router.patch("/:spID", (req, res, next) => {
    const spID = req.params.spID;
    console.log("REQ BODY==>>", req.body);
    const entries = Object.entries(req.body);

    const updateOps = {};
    for (const [key, value] of entries) {
        console.log(`Key==> ${key} and value==>${value}`);
        updateOps[`${key}`] = value;
    }

    Sp.updateMany(
        {
            _id: spID
        },
        {
            $set: updateOps
        }
    )
        .exec()
        .then(result => {
            res.status(200).json({
                result,
                message: `Success updating sp with id ${spID}`,
                status: 200
            });
        })
        .catch(err => {
            console.log(`Error updating sp with id ${spID}`, error);
            res.status(500).json({
                error: err,
                status: 500
            });
        });
});

//Handling deleting a single sp
router.delete("/:spID", (req, res, next) => {
    const spID = req.params.spID;

    Sp.deleteOne({
        _id: spID
    })
        .exec()
        .then(result => {
            console.log(`Sp with ID ${spID} successfuly deleted`);
            res.status(200).json({
                message: `Sp with ID ${spID} successfuly deleted`,
                result
            });
        })
        .catch(err => {
            console.log(`Error deleting sp with ID ${spID}`);
            res.status(500).json({
                message: `Error deleting sp with ID ${spID}`,
                error: err
            });
        });
});

module.exports = router;
