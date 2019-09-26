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
                res.status(200).json(sps)
            } else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log("Error getting sps at '/sps'");
            res.status(500).json({
                message: "Error getting sps at '/sps'"
            })

        })

});


// Handling GET requests for a single commuter by ID
router.get("/:spID", (req, res, next) => {
    const spID = req.params.spID;

    Sp.findById(spID)
        .exec()
        .then(sp => {
            if (sp) {
                res.status(200).json(sp);
            } else {
                console.log("404 error, that sp does not exist")
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


// Handling creating a commuter object and storing it in the database
router.post("/", (req, res, next) => {
    console.log("SP RECEIVED BY BACKEND==>>", req.body);

    //This creates a new commuter object in the database using the commuter model
    const sp = new Sp({
        _id: new mongoose.Types.ObjectId(),
        //   item_name: req.body.name,
        //   rentOrSale: req.body.rentOrSale,
        //   item_price: req.body.price,
        //   item_id: req.body.id,
        //   user_id: req.body.user_id,
        //   date: req.body.date
    });
    //This saves the commuter in the database
    sp
        .save()
        .then(result => {

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


//Handling updating one commuter
router.patch("/:spID", (req, res, next) => {
    const spID = req.params.spID;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Sp.updateMany({
            _id: spID
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                result,
                message: `Success updating sp with id ${spID}`
            });
        })
        .catch(err => {
            console.log(`Error updating sp with id ${spID}`, error);
            res.status(500).json({
                error: err
            });
        });
});


//Handling deleting a single commuter
router.delete("/:spID", (req, res, next) => {
    const spID = req.params.spID;

    Commuter.deleteOne({
            _id: spID
        })
        .exec()
        .then(result => {

            console.log(`Commuter with ID ${spID} successfuly deleted`)
            res.status(200).json({
                message: `Commuter with ID ${spID} successfuly deleted`,
                result
            });
        })
        .catch(err => {
            console.log(`Error deleting commuter with ID ${spID}`)
            res.status(500).json({
                message: `Error deleting commuter with ID ${spID}`,
                error: err
            });
        });
});

module.exports = router;