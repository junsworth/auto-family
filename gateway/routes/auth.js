/**
 * Created by jonathanunsworth on 15/01/14.
 */
'use strict';
var crypto = require('crypto');
var db = require('../models/database');
var lodash = require('lodash');

var hashPassword = exports.hashPassword = function(password) {
  return crypto.createHash('sha256').update(password).digest('base64');
};

var unHashedPassword = exports.unHashPassword = function(password) {
  return crypto.createHash('sha256').update(password).digest('base64');
};

exports.check = function(req, res, next) {
  if (!req.session.user) {
   res.status(401).send({
     code: 'UNAUTHORIZED'
   });
  } else {
   next();
  }
};

exports.login = function(req, res, next) {
  db.User.find({
    where: {
      email: req.body.email,
      password: hashPassword(req.body.password)
    }
  }).then(function(user) {
    if (user) {
      req.session.regenerate(function() {
        req.session.user = {
          id: user.id,
          email: user.email,
          password: user.password,
          UserTypeId: user.UserTypeId,
          data: user.data
        };
        res.json(req.session.user);
      });
    } else {
      next('INVALID_LOGIN');
    }
  });
};

exports.add = function(req, res, next) {

  db.User.find({
    where: {
      email: req.body.email,
      password: hashPassword(req.body.password)
    }
  }).then(function(user) {
    
    if(user) {
      next('USER_ALREADY_EXISTS');
    } else {

      var data = {style:false};

      db.User.create({
        email: req.body.email,
        password: hashPassword(req.body.password),
        UserTypeId: req.body.UserTypeId,
        data: JSON.stringify(data)
      }).catch(function(error){
        console.log('Error adding user');
        next('ERROR_ADDING_REGISTRATION');
        //res.status(204).send();
      }).then(function(user){
        if (user) {
          req.session.regenerate(function() {
            req.session.user = {
              id: user.id,
              email: user.email,
              password: user.password,
              UserTypeId: user.UserTypeId,
              data: user.data
            };
            res.json(req.session.user);
          });
        } else {
          next('INVALID_REGISTRATION');
        }
      }).then(function() {
        //res.redirect('/');
      });
    }
    
  }).then(function() {
      //res.status(200).send();
  });

}

exports.reset = function(req, res, next) {
  
  console.log(JSON.stringify(req.body));

  db.User.find({
    where: {
      email: req.body.email,
      password: hashPassword(req.body.oldPassword)
    }
  }).then(function(user) {
    
    if(user) {
      return user.updateAttributes({password : hashPassword(req.body.newPassword), data:req.body.data}); 
    } else {
      next('INVALID_PASSWORD_RESET');
    }
    
  }).then(function() {
      res.status(200).send();
  });
};

exports.logout = function(req, res, next) {
  req.session.destroy(function() {
    //res.redirect('#/');
    res.status(200).send();
    console.log('User logging out...');
  });
};

exports.getUser = function(req, res) {
  if (req.session && req.session.user) {
    console.log('unHashedPassword - '+ unHashedPassword(req.session.user.password))
    res.send(req.session.user);
  } else {
    res.status(204).send();
  }
};

exports.users = function(req, res) {
  db.User.findAll({
    id: ['id']
  }).then(function(results) {
    res.send(lodash.map(results, function(element, index, list) {
      return lodash.pick(element.toJSON(), ['id', 'email', 'password', 'data', 'UserTypeId']);
    }));
  });
};

exports.get = function(req, res) {
  db.User.findById(parseInt(req.params.id, 10))
    .then(function(result) {
      res.send(result);
    });
};

exports.update = function(req, res) {
  db.User.findById(req.params.id)
    .then(function(result) {
      return result.updateAttributes(req.body);
    }).then(function() {
      res.status(200).send();
    });
};

exports.delete = function(req, res, next) {
  db.sequelize.transaction().then(function(t) {
    db.User.findById(req.params.id, {
      transaction: t
    }).then(function(result) {
      return result.destroy({
        transaction: t
      });
    }).then(function() {
      return t.commit();
    }).then(function() {
      res.status(200).send();
    }, function(err) {
      t.rollback();
      next(err);
    });
  });
};

  