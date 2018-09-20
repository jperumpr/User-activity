/*var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); //required for encrypting the password
mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

var actionSchema = new mongoose.Schema({
    username : String,
    action: String
    //actionDate: dateTime
});

var activity = module.exports = mongoose.model('Activity',actionSchema);

module.exports.getActivityById = function(id, callback){
    activity.findById(id, callback);
}

module.exports.getActivityByUsername = function(username, callback){
    var query = {username: username};
    activity.findOne(query, callback);
}

module.exports.createActivity = function(newActivity, callback){
    newActivity.save();
}*/