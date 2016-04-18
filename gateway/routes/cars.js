'use strict';

var db = require('../models/database');
var lodash = require('lodash');

exports.get = function(req, res) {
  db.Car.findById(parseInt(req.params.id, 10))
    .then(function(result) {
      db.Model.findById(result.ModelId)
        .then(function(model){
          db.Make.findById(model.MakeId)
            .then(function(make){              
              db.Supplier.findById(result.SupplierId)
                .then(function(supplier){

                  if(result.CustomerId!=null) {
                    
                    db.Customer.findById(result.CustomerId)
                    .then(function(customer){

                      // db.User.findById(result.UserId)
                      // .then(function(user){
                        
                      //   var arrayResult = [];
                      //   arrayResult.push({'Car':result});
                      //   arrayResult.push({'Make':make});
                      //   arrayResult.push({'Model':model});
                      //   arrayResult.push({'Supplier':supplier});
                      //   arrayResult.push({'Customer':customer});
                      //   arrayResult.push({'User':user});
                      //   res.send(JSON.stringify(arrayResult));

                      // });
                      
                      var arrayResult = [];
                      arrayResult.push({'Car':result});
                      arrayResult.push({'Make':make});
                      arrayResult.push({'Model':model});
                      arrayResult.push({'Supplier':supplier});
                      arrayResult.push({'Customer':customer});
                      res.send(JSON.stringify(arrayResult));

                    });

                  } else {
                    var arrayResult = [];
                    arrayResult.push({'Car':result});
                    arrayResult.push({'Make':make});
                    arrayResult.push({'Model':model});
                    arrayResult.push({'Supplier':supplier});
                    res.send(JSON.stringify(arrayResult));
                  }

                                  
                  
                });
            });
        });      
    });
};

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
};

// add new car
exports.add = function(req, res, next) {

  db.Car.create({
    header: req.body.header,
    subHeader: req.body.subHeader,
    description: req.body.description,
    mileage: req.body.mileage,
    year: req.body.year,
    purchasePrice: req.body.purchasePrice,
    salePrice: req.body.salePrice,
    insertDate: req.body.insertDate,
    images: req.body.images,
    ModelId: req.body.ModelId,
    SupplierId: req.body.SupplierId
  }).catch(function(error){
    console.log('' + error);
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
      return lodash.pick(element.toJSON(), ['id', 'header', 'subHeader', 'description', 'mileage', 'year', 'purchasePrice', 'salePrice', 'insertDate', 'saleDate', 'images', 'CustomerId', 'ModelId', 'SupplierId', 'UserId']);
    }));
  });
};

// update car
exports.update = function(req, res) {

  console.log('--------------------------' + JSON.stringify(req.body));
  console.log('--------------------------');

  db.Car.findById(req.params.id)
    .then(function(result) {
      return result.updateAttributes(req.body);
    }).then(function() {
      res.status(204).send();
    });
};

// delete car
exports.delete = function(req, res, next) {
  db.sequelize.transaction().then(function(t) {
    db.Car.find(req.params.id, {
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