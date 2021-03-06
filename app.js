'use strict';

/* Configuration Begin */

process.env.PORT = process.env.PORT || 3000;
process.env.IP = process.env.IP || "0.0.0.0";
process.env.DEFAUL_USERNAME = process.env.DEFAUL_USERNAME || "jonathan@bubbleworks.co.za";
process.env.DEFAUL_PASSWORD = process.env.DEFAUL_PASSWORD || "admin";

var UserTypes = ["Admin", "Staff", "User"];

/* Configuration End */

var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./gateway/routes/index');
var db = require('./gateway/models/database');

var auth = require('./gateway/routes/auth');

var app = express();

app.use(cookieParser());

app.use(session({
    secret: 'YOLOOOTROLOOO',
    saveUninitialized: true,
    resave: true
}));

app.use(express.static(path.resolve(__dirname, 'app')));
app.use('/admin', express.static(path.resolve(__dirname, 'admin')));

app.use('/app/images',  express.static( path.join(__dirname, '/app/images')));
app.use('/admin/images',  express.static( path.join(__dirname, '/admin/images')));

app.use('/images',  express.static( path.join(__dirname, '/images')));
app.use('/common/styles',  express.static( path.join(__dirname, '/styles')));
app.use('/common/views',  express.static( path.join(__dirname, '/views')));
app.use('/common/scripts',  express.static( path.join(__dirname, '/scripts')));
app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log('HTTP request "%s" params=%j body=%j Timestamp = "%s"', req.url, req.params, req.body, new Date());
    next();
})
app.use(routes);
app.use(function(err, req, res, next) {
    console.error('Woo such error handling');
    console.error(err);
    res.status(500);
    if (err instanceof Error) {
        console('ERROR! ' + JSON.stringify(err));

        res.send({
            code: 'UKNOW_ERROR',
            name: err.name,
            message: err.message,
            stack: err.stack
        });
    } else {

        var errToSend = {
            code: typeof err === 'string' ? err : 'UKNOW_ERROR'
        };

        console.log(JSON.stringify(errToSend) + '  ERROR! ' + JSON.stringify(err));

        res.send({
            code: typeof err === 'string' ? err : 'UKNOW_ERROR'
        });
    }
});

//Checking connection status
db.sequelize.authenticate().then(function () {
    
    console.log('Database connection has been successfully established.');

    db.sequelize.sync({
    force: false
        }).then(function() {
            
            console.log('DB has been created successfully');

            //create default user if none exit
            db.User.count().then(function(c) {
                if (c === 0) {

                    // create user types
                    for( var i in UserTypes) {

                        var type = UserTypes[i];

                        console.log("", type)

                        db.UserType.create({    
                          title: type
                        });
                        
                    }
                    
                    var data = {style:false};

                    // create admin user
                    db.User.create({
                        email: process.env.DEFAUL_USERNAME,
                        password: auth.hashPassword(process.env.DEFAUL_PASSWORD),
                        UserTypeId: 1,
                        data: JSON.stringify(data)
                    });

                }
            });
            
            app.listen(process.env.PORT, process.env.IP, function() {
                console.log("Console server listening at ", process.env.IP + ":" + process.env.PORT);
            });

        }).catch(function (err){
            console.log('*** DB NOT CREATED ERROR\n', err + '***\n');
        }).done();

}).catch(function (err){
    console.log('***DB connection ERROR\n', err + '***\n');
}).done();

