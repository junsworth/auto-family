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

// add new car
exports.add = function(req, res, next) {

  db.Car.create({
    header: req.body.header,
    description: req.body.description,
    mileage: req.body.mileage,
    year: req.body.year,
    purchasePrice: req.body.purchasePrice,
    salePrice: req.body.salePrice,
    insertDate: req.body.insertDate,
    saleDate: req.body.saleDate,
    images: req.body.images,
    ModelId: req.body.ModelId,
    SupplierId: req.body.SupplierId
  }).catch(function(error){
    next('ERROR_ADDING_CAR');
  }).then(function(car){
    if (car) {
      res.json(car);
    } else {
      next('INVALID_CAR_REGISTRATION');      
    }
  });

};

// get all cars
exports.cars = function(req, res) {

  db.Car.findAll({
    id: ['id']
  }).then(function(results) {

    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'header', 'description', 'mileage', 'year', 'purchasePrice', 'salePrice', 'insertDate', 'saleDate', 'images']);
    }));

  });

};