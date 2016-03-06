/**
 * Created by jonathanunsworth on 15/01/14.
 */
'use strict';

var db = require('../models/database');
var lodash = require('lodash');

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
        name: req.body.email,
        address: req.body.address,
        addresstwo: req.body.addresstwo,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone
      }).catch(function(error){

        next('ERROR_ADDING_CUSTOMER');

      }).then(function(customer){
        
        if (customer) {
          
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

}