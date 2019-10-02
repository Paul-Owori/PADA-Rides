const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Trip = require("../models/Trip");

// Handling GET requests for all trips
router.get("/", (req, res, next) => {
    Trip.find()
        .exec()
        .then(trips => {
            if (trips.length > 0) {
                res.status(200).json(trips);
            } else {
                res.status(404).json({
                    message: "No entries found"
                });
            }
        })
        .catch(err => {
            console.log("Error getting trips at '/trips'");
            res.status(500).json({
                message: "Error getting trips at '/trips'"
            });
        });
});


//Help a service provider locate clients 
router.get("/client-search", (req, res, next) => {
    Trip.find()
        .exec()
        .then(trips => {
            if (trips.length > 0) {

                let clients = trips.filter(tripObject => {
                    return tripObject.sp_id === undefined
                });

                if (clients.length > 0) {
                    res.status(200).json({
                        status: 200,
                        clients
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "No clients found"
                    });
                }


            } else {
                res.status(404).json({
                    status: 404,
                    message: "No clients found"
                });
            }
        })
        .catch(err => {
            console.log("Error getting trips at '/trips/client-search'");
            res.status(500).json({
                message: "Error getting trips at '/trips/client-search'"
            });
        });
});


// Handling GET requests for a single trip by ID
router.get("/:tripID", (req, res, next) => {
    const tripID = req.params.tripID;

    Trip.findById(tripID)
        .exec()
        .then(trip => {
            if (trip) {
                res.status(200).json({
                    status: 200,
                    trip
                });
            } else {
                console.log("404 error, that trip does not exist");
                res.status(404).json({
                    status: 404,
                    message: "That trip does not exist"
                });
            }
        })
        .catch(err => {
            console.log(`Error getting trip with ID ${tripID}`, err);
            res.status(500).json({
                message: `Error getting trip with ID ${tripID}`,
                error: err
            });
        });
});



// Handling GET requests for a single trip by ID
router.get("/sp-find/:tripID", (req, res, next) => {
    const tripID = req.params.tripID;

    Trip.findById(tripID)
        .exec()
        .then(trip => {
            if (trip) {
                if (trip.sp_id === undefined) {
                    res.status(404).json({
                        status: 404,
                        message: "No Sp found yet"
                    });
                } else {
                    res.status(200).json({
                        status: 200,
                        trip
                    });
                }
            } else {
                console.log("404 error, that trip does not exist");
                res.status(404).json({
                    status: 404,
                    message: "That trip does not exist"
                });
            }
        })
        .catch(err => {
            console.log(`Error getting trip with ID ${tripID}`, err);
            res.status(500).json({
                message: `Error getting trip with ID ${tripID}`,
                error: err
            });
        });
});




//Handling GET requests for all the trips associated with a particular commuter
router.get("/commuter/:commuterID", (req, res, next) => {
    const commuterID = req.params.commuterID;

    Trip.find({
            commuterID: commuterID
        })
        .exec()
        .then(trips => {
            if (trips.length > 0) {
                res.status(200).json(trips);
            } else {
                res.status(404).json({
                    message: `No entries found for trips by commuter with id ${commuterID} .`
                });
            }
        })
        .catch(err => {
            console.log(
                `Error getting trips for commuter with id ${commuterID}`,
                err
            );
            res.status(500).json({
                message: `Error getting trips for commuter with id ${commuterID}`,
                error: err
            });
        });
});

//Handling GET requests for all the trips associated with a particular sp
router.get("/sp/:spID", (req, res, next) => {
    const spID = req.params.spID;

    Trip.find({
            spID: spID
        })
        .exec()
        .then(trips => {
            if (trips.length > 0) {
                res.status(200).json(trips);
            } else {
                res.status(404).json({
                    message: `No entries found for trips by sp with id ${spID} .`
                });
            }
        })
        .catch(err => {
            console.log(`Error getting trips for sp with id ${spID}`, err);
            res.status(500).json({
                message: `Error getting trips for sp with id ${spID}`,
                error: err
            });
        });
});

// Handling creating a trip object and storing it in the database
router.post("/create", (req, res, next) => {
    console.log("TRIP RECEIVED BY BACKEND==>>", req.body);

    //This creates a new trip object in the database using the trip model
    const trip = new Trip({
        _id: new mongoose.Types.ObjectId(),
        pickUp: req.body.pickUp,
        destination: req.body.destination,
        commuter_id: req.body.commuter_id,
        advanceBooking: req.body.advanceBooking
    });
    //This saves the trip in the database
    trip.save()
        .then(result => {
            console.log("Result==>", result)
            res.status(201).json({
                trip: result,
                status: 201
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `Error posting trip ${trip} at '/trips'`,
                error: err,
                status: 500
            });
        });
});

//Handling updating one trip
router.patch("/:tripID", (req, res, next) => {
    console.log("UPdate trip attempted")
    const tripID = req.params.tripID;

    const entries = Object.entries(req.body);

    const updateOps = {};
    for (const [key, value] of entries) {
        console.log(`Key==> ${key} and value==>${value}`);
        updateOps[`${key}`] = value;
    }

    Trip.updateMany({
            _id: tripID
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            console.log("Trip update attempt=>", result)
            res.status(200).json({
                status: 200,
                result,
                message: `Success updating trip with id ${tripID}`
            });
        })
        .catch(err => {
            console.log(`Error updating trip with id ${tripID}`, error);
            res.status(500).json({
                error: err
            });
        });
});

//Handling deleting a single trip
router.delete("/:tripID", (req, res, next) => {
    const tripID = req.params.tripID;

    Trip.deleteOne({
            _id: tripID
        })
        .exec()
        .then(result => {
            console.log(`Trip with ID ${tripID} successfuly deleted`);
            res.status(200).json({
                message: `Trip with ID ${tripID} successfuly deleted`,
                result
            });
        })
        .catch(err => {
            console.log(`Error deleting Trip with ID ${tripID}`);
            res.status(500).json({
                message: `Error deleting Trip with ID ${tripID}`,
                error: err
            });
        });
});

module.exports = router;

//client-search