'use strict';

var db = require('../models/database');
var lodash = require('lodash');

exports.getSalesTotal = function(req, res) {
	db.Car.sum('salePrice', { where: ["CustomerId > ?", 0] }).then(function(sum) {
		//res.send(sum);
		console.log('sum -- ' + sum);
		res.json(sum);
	});
};

exports.getPurchasesTotal = function(req, res) {
	db.Car.sum('purchasePrice').then(function(sum) {
		//res.send(sum);
		res.json(sum);
	});
};

// Project.sum('age', { where: { age: { $gt: 5 } } }).then(function(sum) {
//   // will be 50
// })
