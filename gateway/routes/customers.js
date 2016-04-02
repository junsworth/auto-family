/**
 * Created by jonathanunsworth on 15/01/14.
 */
'use strict';

var db = require('../models/database');
var lodash = require('lodash');

exports.get = function(req, res) {
  db.Customer.findById(parseInt(req.params.id, 10))
    .then(function(result) {
      res.send(result);
    });
};

exports.customers = function(req, res) {
  db.Customer.findAll({
    id: ['id']
  }).then(function(results) {
    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'name', 'address','addresstwo', 'city', 'email', 'phone']);
    }));
  });
};

exports.add = function(req, res, next) {
  db.Customer.find({
    where: {
      name: req.body.name
    }
  }).then(function(customer) {    
    if(customer) {
      next('CUSTOMER_ALREADY_EXISTS');
    } else {
      db.Customer.create({
        name: req.body.name,
        address: req.body.address,
        addresstwo: req.body.addresstwo,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone
      }).catch(function(error) {
        next('ERROR_ADDING_CUSTOMER');
      }).then(function(customer) {        
        if (customer) {
          res.json(customer);
        } else {
          next('INVALID_CUSTOMER_REGISTRATION');          
        }
      }).then(function() {
        //res.redirect('/');
      });
    }    
  }).then(function() {
      //res.status(200).send();
  });
};

exports.update = function(req, res) {
  db.Customer.findById(req.params.id)
    .then(function(result) {
      return result.updateAttributes(req.body);
    }).then(function() {
      res.status(204).send();
    });
};

exports.delete = function(req, res, next) {
  db.sequelize.transaction().then(function(t) {
    db.Customer.findById(req.params.id, {
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