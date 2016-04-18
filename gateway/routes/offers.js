'use strict';

var db = require('../models/database');
var lodash = require('lodash');

exports.get = function(req, res) {
  db.Offer.findById(parseInt(req.params.id, 10))
    .then(function(result) {
      res.send(result);
    });
};

exports.offers = function(req, res) {
  db.Offer.findAll({
    id: ['id']
  }).then(function(results) {
    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'title', 'header','description', 'images', 'startDate', 'endDate']);
    }));
  });
};

exports.add = function(req, res, next) {
  db.Offer.create({
    title: req.body.title,
    header: req.body.header,
    description: req.body.description,
    images: req.body.images,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }).catch(function(error) {
    next('ERROR_ADDING_SERVICE');
  }).then(function(offer) {        
    if (offer) {
      res.json(offer);
    } else {
      next('INVALID_OFFER_REGISTRATION');          
    }
  }).then(function() {
    //res.redirect('/');
  });
};

exports.update = function(req, res) {
  db.Offer.findById(req.params.id)
    .then(function(result) {
      return result.updateAttributes(req.body);
    }).then(function() {
      res.status(204).send();
    });
};

exports.delete = function(req, res, next) {
  db.sequelize.transaction().then(function(t) {
    db.Offer.findById(req.params.id, {
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