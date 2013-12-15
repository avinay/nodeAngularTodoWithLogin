var User
    , _ =               require('underscore')
    , passport =        require('passport')
    , LocalStrategy =   require('passport-local').Strategy
    , check =           require('validator').check
    , userRoles =       require('../src/js/routingConfig').userRoles;


var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
    firstName: { type: String, required: true },
    latName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role: { bitMask: { type: Number, required: true}, title: { type: String, required: true} }
});


var User = mongoose.model('User', userSchema);

module.exports = {

    findUser: function(username, callback){
        User.findOne({ username: username }, function (err, user) {
            callback(err, user);
        });
    },
    findById: function(id, callback){
        User.findById(id, function (err, user) {
            callback(err, user);
        });
    },
    addUser: function(firstName, lastName, username, email, password, role, callback) {

        this.findUser(username, function(err, user){
            if(user) return callback("UserAlreadyExists");

            var user = new User({
                firstName: firstName,
                latName: lastName,
                username: username,
                email: email,
                password: password,
                role: role
            });

            user.save(function (err, user, numberAffected) {
                if (err) callback(err);
                if(numberAffected) callback(err, user);
            })

        });
    },

    findByUsername: function(username, callback) {
        this.findUser(username, function(err, user){
            if(user) callback(err, user);
        });
    },

    validate: function(user) {
        check(user.username, 'Username must be 1-20 characters long').len(1, 20);
        check(user.password, 'Password must be 5-60 characters long').len(5, 60);
        check(user.username, 'Invalid username').not(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
    },

    localStrategy: new LocalStrategy(
        function(username, password, done) {

            var user = module.exports.findByUsername(username, function(err, user){
                if(!user) {
                    done(null, false, { message: 'Incorrect username.' });
                }
                else if(user.password != password) {
                    done(null, false, { message: 'Incorrect username.' });
                }
                else {
                    return done(null, user);
                }
            });
        }
    ),

    serializeUser: function(user, done) {
        done(null, user._id);
    },

    deserializeUser: function(id, done) {
        console.log(id);
        var user = module.exports.findById(id, function(err, user){
            if(user)    { done(null, user); }
            else        { done(null, false); }
        });
    }
};