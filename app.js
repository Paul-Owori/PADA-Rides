const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 4000;

// Importing routes
const commuterRoutes = require('./server/routes/commuters')
const spRoutes = require('./server/routes/sps')
const tripRoutes = require('./server/routes/trips')

//Designating folder with all the app contents
app.use(express.static('./client/public'));

// All middleware

//file uploader middleware
app.use(fileUpload());
//bodyParser middleware
app.use(bodyParser.json());


//Setting up landing page and default go to page for unexpected requests
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

//Setting up routes
app.use('/commuters', commuterRoutes);
app.use('/sps', spRoutes);
app.use('/trips', tripRoutes);

app.listen(port, () => {
    console.log(`PADA - Rides is running on port ${port}`);
});