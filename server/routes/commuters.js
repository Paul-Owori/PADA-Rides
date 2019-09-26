const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Commuter = require("../models/Commuter");


// Handling GET requests for all commuters
router.get("/", (req, res, next) => {

    Commuter.find()
        .exec()
        .then(commuters => {
            if (commuters.length > 0) {
                res.status(200).json(commuters)
            } else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log("Error getting commuters at '/commuters'");
            res.status(500).json({
                message: "Error getting commuters at '/commuters'"
            })

        })

});


// Handling GET requests for a single commuter by ID
router.get("/:commuterID", (req, res, next) => {
    const commuterID = req.params.commuterID;

    Commuter.findById(commuterID)
        .exec()
        .then(commuter => {
            if (commuter) {
                res.status(200).json(commuter);
            } else {
                console.log("404 error, that commuter does not exist")
                res.status(404).json({
                    message: "That commuter does not exist"
                });
            }
        })
        .catch(err => {
            console.log(`Error getting commuter with ID ${commuterID}`, err);
            res.status(500).json({
                message: `Error getting commuter with ID ${commuterID}`,
                error: err
            });
        });
});


// Handling creating a commuter object and storing it in the database
router.post("/", (req, res, next) => {
    console.log("COMMUTER RECEIVED BY BACKEND==>>", req.body);

    //This creates a new commuter object in the database using the commuter model
    const commuter = new Commuter({
        _id: new mongoose.Types.ObjectId(),
        //   item_name: req.body.name,
        //   rentOrSale: req.body.rentOrSale,
        //   item_price: req.body.price,
        //   item_id: req.body.id,
        //   user_id: req.body.user_id,
        //   date: req.body.date
    });
    //This saves the commuter in the database
    commuter
        .save()
        .then(result => {

            res.status(201).json({
                commuter: commuter,
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error posting commuter at '/commuters'",
                error: err
            });
        });
});


//Handling updating one commuter
router.patch("/:commuterID", (req, res, next) => {
    const commuterID = req.params.commuterID;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Commuter.updateMany({
            _id: commuterID
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                result,
                message: `Success updating commuter with id ${commuterID}`
            });
        })
        .catch(err => {
            console.log(`Error updating commuter with id ${commuterID}`, error);
            res.status(500).json({
                error: err
            });
        });
});


//Handling deleting a single commuter
router.delete("/:commuterID", (req, res, next) => {
    const commuterID = req.params.commuterID;

    Commuter.deleteOne({
            _id: commuterID
        })
        .exec()
        .then(result => {

            console.log(`Commuter with ID ${commuterID} successfuly deleted`)
            res.status(200).json({
                message: `Commuter with ID ${commuterID} successfuly deleted`,
                result
            });
        })
        .catch(err => {
            console.log(`Error deleting commuter with ID ${commuterID}`)
            res.status(500).json({
                message: `Error deleting commuter with ID ${commuterID}`,
                error: err
            });
        });
});

module.exports = router;