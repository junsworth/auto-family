'use strict';

var db = require('../models/database');
var lodash = require('lodash');

// get all car makes
exports.makes = function(req, res) {
	console.log('getting car makes');
  db.Make.findAll({
    id: ['id']
  }).then(function(results) {

    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'title']);
    }));

  });

};

// get all car models
exports.models = function(req, res) {

  db.Model.findAll({
    id: ['id']
  }).then(function(results) {

    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'title', 'MakeId']);
    }));

  });

};

// find all car models by make id
exports.findModelsByMakeId = function(req, res) {
	db.Model.find({
    where: {
      MakeId: req.body.makeId
    }
  }).catch(function(error){
        console.log('Error retrieving models');
        next('ERROR_RETRIEVING_MODELS');
        //res.status(204).send();
  }).then(function(models) {
  
  });

}