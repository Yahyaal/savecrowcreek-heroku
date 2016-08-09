var mongoose = require('mongoose');

var Test = mongoose.model('Test', {		// Define a Test model with the schema below
	date: Date,
	email: String,
	location: String,
	ph1: Number,
	ph2: Number,
	nitrate1: Number,
	nitrate2: Number,
	nitrite1: Number,
	nitrite2: Number,
	amonia1: Number,
	amonia2: Number,
	phosphate1: Number,
	phosphate2: Number,
	chloride1: Number,
	chloride2: Number,
	observation: String,
	intervention: String,
	photo: String
});

module.exports = Test;