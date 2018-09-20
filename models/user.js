var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); //required for encrypting the password
mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

//User Schema for mongodb
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
    //local : {
        loginHistory: [],
        actions: [],
        actionData: []
   // }
});

var user = module.exports = mongoose.model('User',UserSchema,'users');



//var activity = module.exports = mongoose.model('Activity',actionSchema,'users');

module.exports.getUserById = function(id, callback){
    user.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    user.findOne(query, callback);
}

module.exports.getActivityById = function(id, callback){
    activity.findById(id, callback);
}

module.exports.retrieveCount=function(id,action, callback){
	user.aggregate(([{$unwind: "$actionData"}, { $match: { "actionData.type": action,
            "username": id
        }
    }, {$project: {_id: 0, actionData: 1}}]),callback);

}

module.exports.retrieveTags=function(id,action, callback){
    user.aggregate(([{$unwind: "$actionData"}, { $match: { "actionData.type": action,
            "username": id
        }
    }, {$project: {_id: 0, "actionData.content": 1}}]),callback);

}

module.exports.getActivityByUsername = function(username, callback){
    var query = {username: username};
    activity.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
}
module.exports.createActivity = function(newActivity, callback){
	newActivity.save();
}

//module.exports.createUser = function(newUser, callback){
//    newUser.save(callback);
//}

