'use strict';

var db = require('../models/database');
var lodash = require('lodash');

exports.get = function(req, res) {
  db.Service.findById(parseInt(req.params.id, 10))
    .then(function(result) {
      res.send(result);
    });
};

exports.services = function(req, res) {
  db.Service.findAll({
    id: ['id']
  }).then(function(results) {
    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'title', 'header','description', 'images']);
    }));
  });
};

exports.add = function(req, res, next) {
  db.Service.create({
    title: req.body.title,
    header: req.body.header,
    description: req.body.description,
    images: req.body.images
  }).catch(function(error) {
    next('ERROR_ADDING_SERVICE');
  }).then(function(service) {        
    if (service) {
      res.json(service);
    } else {
      next('INVALID_SERVICE_REGISTRATION');          
    }
  }).then(function() {
    //res.redirect('/');
  });
};

exports.update = function(req, res) {
  db.Service.findById(req.params.id)
    .then(function(result) {
      return result.updateAttributes(req.body);
    }).then(function() {
      res.status(204).send();
    });
};

exports.delete = function(req, res, next) {
  db.sequelize.transaction().then(function(t) {
    db.Service.findById(req.params.id, {
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