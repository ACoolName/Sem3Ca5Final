global.JPA = true;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./model/db");
var restify = require('express-restify-mongoose');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Origin = mongoose.model('Origin');
var Class = mongoose.model('Class');
var Unit = mongoose.model('Unit');
var Product = mongoose.model('Product');
var routes = require('./routes/index');

var expressJwt = require('express-jwt');

var app = express();

var adminToken = require("./security/secrets").secretTokenAdmin;

//We can skip Authentication from our Unit Tests, but NEVER in production
if (process.env.NODE_ENV || typeof global.SKIP_AUTHENTICATION == "undefined") {}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/app')));

app.use('/', routes);

function AllCanGetIt(req, res, next) {
    if (req.method === 'GET') {
        return next();
    }
    return expressJwt({secret: adminToken})(req, res, next);
};

var options = {
    middleware: AllCanGetIt,
    plural: false,
    prefix: "/rest",
    version: "/v1",
    strict: true,
    private: "__v"};

restify.serve(app, Origin, options);
restify.serve(app, Class, options);
restify.serve(app, Unit, options);
restify.serve(app, Product, options);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
