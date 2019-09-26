//Call mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pada-rides:trip256@cluster0-l6z9b.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected")
});