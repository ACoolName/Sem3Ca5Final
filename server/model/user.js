var mongoose = require("mongoose");
var User = mongoose.model("User");

var user = {};

user.get = function (username, callback) {
    User.findOne({username: username}, callback);
};

user.add = function (user, callback) {
    var newUser = new User(user);
    newUser.save(callback);
};

module.exports = user;