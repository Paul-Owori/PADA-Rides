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



// app.get('/sps/all', (req, res) => {
//     console.log("Random was triggered")
// })

//Setting up routes
app.use("/commuters", commuterRoutes);
app.use("/sps", spRoutes);
app.use("/trips", tripRoutes);
app.use("/messages", messageRoutes);


//Setting up landing page and default go to page for unexpected requests
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
});

// db.connect()
//     .then(() => {

//         app.listen(port, () => {
//             console.log(`PADA - Rides is running on port ${port}`);
//         });
//     })

//Call mongoose
var mongoose = require("mongoose");

let davidDB_URI = "mongodb+srv://pada-rides:trip256@cluster0-l6z9b.mongodb.net/test?retryWrites=true&w=majority"
let paulDB_URI = "mongodb+srv://Paule:Paule@byarentcluster-gfhab.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(
    davidDB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    // we're connected!
    console.log("Database is connected");
});

app.listen(port, () => {
    console.log(`PADA - Rides is running on port ${port}`);
});