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
                res.status(200).json(trips)
            } else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log("Error getting trips at '/trips'");
            res.status(500).json({
                message: "Error getting trips at '/trips'"
            })

        })

});


// Handling GET requests for a single trip by ID
router.get("/:tripID", (req, res, next) => {
    const tripID = req.params.tripID;

    Trip.findById(tripID)
        .exec()
        .then(trip => {
            if (trip) {
                res.status(200).json(trip);
            } else {
                console.log("404 error, that trip does not exist")
                res.status(404).json({
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
            console.log(`Error getting trips for commuter with id ${commuterID}`, err);
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
router.post("/", (req, res, next) => {
    console.log("TRIP RECEIVED BY BACKEND==>>", req.body);

    //This creates a new trip object in the database using the trip model
    const trip = new Trip({
        _id: new mongoose.Types.ObjectId(),
        //   item_name: req.body.name,
        //   rentOrSale: req.body.rentOrSale,
        //   item_price: req.body.price,
        //   item_id: req.body.id,
        //   user_id: req.body.user_id,
        //   date: req.body.date
    });
    //This saves the trip in the database
    trip
        .save()
        .then(result => {

            res.status(201).json({
                trip: trip,
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `Error posting trip ${trip} at '/trips'`,
                error: err
            });
        });
});


//Handling updating one trip
router.patch("/:tripID", (req, res, next) => {
    const tripID = req.params.tripID;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Trip.updateMany({
            _id: tripID
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
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

            console.log(`Trip with ID ${tripID} successfuly deleted`)
            res.status(200).json({
                message: `Trip with ID ${tripID} successfuly deleted`,
                result
            });
        })
        .catch(err => {
            console.log(`Error deleting Trip with ID ${tripID}`)
            res.status(500).json({
                message: `Error deleting Trip with ID ${tripID}`,
                error: err
            });
        });
});

module.exports = router;