// //Call mongoose
// var mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://pada-rides:trip256@cluster0-l6z9b.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("connected")
// });




const mongoose = require("mongoose");
const DB_URI = 'mongodb+srv://pada-rides2:trip256@cluster0-l6z9b.mongodb.net/test?retryWrites=true&w=majority' //process.env.MONGODB_URI;

function connect() {
  return new Promise((resolve, reject) => {
    //Connect to the database then resolve the promise
    const conn = mongoose
      .connect(DB_URI, {
        useNewUrlParser: true
      })
      .then((res, err) => {
        if (err) return reject(err);
        console.log("Database online");

        resolve();
      });
  });
}

function close() {
  console.log("Database gone offline");
  return mongoose.disconnect();
}

module.exports = {
  connect,
  close
};