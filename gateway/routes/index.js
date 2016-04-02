'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models/database');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var router = express.Router();

var auth = require('./auth');
var cars = require('./cars');
var suppliers = require('./suppliers');
var customers = require('./customers');
var services = require('./services');
var offers = require('./offers');
var news = require('./news');
var events = require('./events');
var testdrive = require('./testdrive');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

// auth
router.post('/auth/login', auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/user', auth.getUser);
router.get('/auth/users', auth.users);
router.post('/auth/reset', auth.reset);
router.post('/auth/add', auth.add);

router.get('/users/get/:id', auth.check, auth.get);
router.put('/users/update/:id', auth.check, auth.update);
router.delete('/users/delete/:id', auth.check, auth.delete);

// cars
router.get('/cars/makes', cars.makes);
router.get('/cars/models', cars.models);
router.get('/cars/cars', cars.cars);
router.post('/cars/add', cars.add);
router.get('/cars/get/:id', cars.get);
router.put('/cars/update/:id', auth.check, cars.update);
router.delete('/cars/delete/:id', auth.check, cars.delete);

// suppliers
router.post('/suppliers/add', suppliers.add);
router.get('/suppliers/suppliers', suppliers.suppliers);
router.get('/suppliers/get/:id', auth.check, suppliers.get);
router.put('/suppliers/update/:id', auth.check, suppliers.update);
router.delete('/suppliers/delete/:id', auth.check, suppliers.delete);


// customers
router.post('/customers/add', customers.add);
router.get('/customers/customers', customers.customers);
router.get('/customers/get/:id', auth.check, customers.get);
router.put('/customers/update/:id', auth.check, customers.update);
router.delete('/customers/delete/:id', auth.check, customers.delete);

// services
router.post('/services/add', services.add);
router.get('/services/services', services.services);
router.get('/services/service/:id', auth.check, services.get);
router.put('/services/update/:id', auth.check, services.update);
router.delete('/services/delete/:id', auth.check, services.delete);

// offers
router.post('/offers/add', offers.add);
router.get('/offers/offers', offers.offers);
router.get('/offers/offer/:id', auth.check, offers.get);
router.put('/offers/update/:id', auth.check, offers.update);
router.delete('/offers/delete/:id', auth.check, offers.delete);

// news
router.post('/news/add', news.add);
router.get('/news/articles', news.articles);
router.get('/news/article/:id', auth.check, news.get);
router.put('/news/update/:id', auth.check, news.update);
router.delete('/news/delete/:id', auth.check, news.delete);

// events
router.post('/events/add', events.add);
router.get('/events/events', events.events);
router.get('/events/event/:id', auth.check, events.get);
router.put('/events/update/:id', auth.check, events.update);
router.delete('/events/delete/:id', auth.check, events.delete);

// testdrive
router.post('/testdrives/add', testdrive.add);

// image processing
router.post('/images/upload', multipartMiddleware, function(req, resp) {
  
  // don't forget to delete all req.files when done
  console.log(req.body, req.files);
  
  var file = req.files.file;
  var newFilePath = "/home/bugzilla/Documents/Development/auto-family/images/" + file.name;

  console.log('----------------------------------');
  console.log('filePath' + file.path);
  console.log('filename: ' + file.name);
  console.log('fileSize: '+ (file.size / 1024));
  console.log('----------------------------------');
  
  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile(newFilePath, data, function (err) {
      console.log('*** File Saved ' + req.files.file.name + ' ***');
      resp.status(200).send();
    });
  });
});

module.exports = router;