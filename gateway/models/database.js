'use strict'

var fs = require('fs');
var util = require('util');
var path = require('path');
var Sequelize = require('sequelize');
var lodash = require('lodash');
var sequelize = new Sequelize('family-cars', 'root', 'bug@2016', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: true,
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  }
});

var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'database.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);