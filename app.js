const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 4000;

//Importing routes
const commuterRoutes = require("./server/routes/commuters");
const spRoutes = require("./server/routes/sps");
const tripRoutes = require("./server/routes/trips");
const messageRoutes = require("./server/routes/messages");

// Database connection

//const db = require('./server/database/db')

//Designating folder with all the app contents
app.use(express.static("./client/public"));

// All middleware

//file uploader middleware
app.use(fileUpload());
//bodyParser middleware
app.use(bodyParser.json());

//Setting up landing page and default go to page for unexpected requests
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
});

//Setting up routes
app.use("/commuters", commuterRoutes);
app.use("/sps", spRoutes);
app.use("/trips", tripRoutes);
app.use("/messages", messageRoutes);

// db.connect()
//     .then(() => {

//         app.listen(port, () => {
//             console.log(`PADA - Rides is running on port ${port}`);
//         });
//     })

//Call mongoose
var mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://pada-rides:trip256@cluster0-l6z9b.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    // we're connected!
    console.log("connected");
});

app.listen(port, () => {
    console.log(`PADA - Rides is running on port ${port}`);
});
