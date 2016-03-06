/**
 * Created by jonathanunsworth on 15/01/14.
 */
'use strict';

var db = require('../models/database');
var lodash = require('lodash');

exports.suppliers = function(req, res) {

  db.Supplier.findAll({
    id: ['id']
  }).then(function(results) {

    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'name', 'address','addresstwo', 'city', 'email', 'phone']);
    }));
  });

};

exports.add = function(req, res, next) {

  db.Supplier.find({
    where: {
      name: req.body.name
    }
  }).then(function(supplier) {
    
    if(supplier) {
      next('SUPPLIER_ALREADY_EXISTS');
    } else {
      db.Supplier.create({
        name: req.body.name,
        address: req.body.address,
        addresstwo: req.body.addresstwo,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone
      }).catch(function(error){

        next('ERROR_ADDING_SUPPLIER');

      }).then(function(supplier){
        
        if (supplier) {
          res.json(supplier);
        } else {

          next('INVALID_SUPPLIER_REGISTRATION');
          
        }

      }).then(function() {
        //res.redirect('/');
      });
    }
    
  }).then(function() {
      //res.status(200).send();
  });

}