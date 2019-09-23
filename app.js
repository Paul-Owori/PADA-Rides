const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000

app.use(express.static('client/public'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(port, () => {
    console.log(`PADA - Rides is running on port ${port}`);
});