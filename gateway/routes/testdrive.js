'use strict';

var db = require('../models/database');
var lodash = require('lodash');

exports.get = function(req, res) {
  db.TestDrive.findById(parseInt(req.params.id, 10))
    .then(function(result) {
      res.send(result);
    });
};

exports.offers = function(req, res) {
  db.TestDrive.findAll({
    id: ['id']
  }).then(function(results) {
    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'email', 'name','phone', 'requestDate', 'completeDate']);
    }));
  });
};

exports.add = function(req, res, next) {
  db.TestDrive.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    requestDate: req.body.requestDate,
    CarId: req.body.carId
  }).catch(function(error) {
    console.log('TEST_DRIVE - ' + error);
    next('ERROR_ADDING_TEST_DRIVE');
  }).then(function(result) {        
    if (result) {
      res.json(result);
    } else {
      next('INVALID_TEST_DRIVE_REGISTRATION');          
    }
  }).then(function() {
    //res.redirect('/');
  });
};

exports.update = function(req, res) {
  db.TestDrive.findById(req.params.id)
    .then(function(result) {
      return result.updateAttributes(req.body);
    }).then(function() {
      res.status(204).send();
    });
};

exports.delete = function(req, res, next) {
  db.sequelize.transaction().then(function(t) {
    db.TestDrive.find(req.params.id, {
      transaction: t
    }).then(function(result) {
      return result.destroy({
        transaction: t
      });
    }).then(function() {
      return t.commit();
    }).then(function() {
      res.status(204).send();
    }, function(err) {
      t.rollback();
      next(err);
    });
  });
};