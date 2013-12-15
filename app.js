
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy =   require('passport-local').Strategy;
var User = require('./models/user.js');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'src')));

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'Superdupersecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

passport.use(User.localStrategy);
//passport.use(User.twitterStrategy());  // Comment out this line if you don't want to enable login via Twitter
//passport.use(User.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook
//passport.use(User.googleStrategy());   // Comment out this line if you don't want to enable login via Google
//passport.use(User.linkedInStrategy()); // Comment out this line if you don't want to enable login via LinkedIn

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);



mongoose.connect('localhost', 'node-angular-login');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

    // checking is db connected
    console.log('Connected to DB');

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    // Application routes
    routes(app, db);

    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });

});

