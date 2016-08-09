var express = require('express');			// Import express
var bodyParser = require('body-parser');	// We use bodyParser to parse POST requests
var mongoose = require('mongoose');			// Import mongoose

mongoose.Promise = Promise;							// Set the default Promise handler to the global ES6 Promise.

var uristring = 
  process.env.MONGODB_URI || 'mongodb://localhost/savecrowcreek';
mongoose.connect(uristring, function (err, res) {
	if (err) {
		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + uristring);
	}
});


var app = express();								// Create our express application
app.use(express.static('./public'));				// Serve our static content out of public/
app.use(bodyParser());								// Use the bodyParser to parse our POST requests
var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Listening at http://localhost:'+port);
});

var Test = require('./models/test');				// Import our Post model (defined in models/post.js)

app.get('/tests', function(req,res) {				// Define a GET /posts route
	Test.find().exec().then(function(tests) {		// Find all posts
		res.json(tests);
	});
	
});

app.post('/tests', function(req,res) {				// Define a POST /posts route
	var test = req.body;
	if (test._id) {
		test.findOneAndUpdate({_id:test._id}, test).exec().then(function() {
			res.json(true);
		});
	} else {
		var newTest = new Test(test);					// Create a new post document from the body
		
		newTest.save().then(function() {					// Save the post and then...
			res.json(true);								// Return true (true has no meaning here, we easily could return the post we just created)
		});
	}
});
app.delete('/tests/:id', function(req,res) {
	var id = req.params.id;
	Test.findOneAndRemove({_id:id}).exec().then(function() {
			res.json(true);
		});
});