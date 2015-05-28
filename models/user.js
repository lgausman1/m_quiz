var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
	userName: { 
		type: String, 
		required: true,
		index: {
			unique: true
		}
	},
	email: { 
		type: String, 
		required: true, 
		index: { 
			unique: true }
	},
	passwordDigest: { 
		type: String, 
		required: true }

});

var confirm = function (pwd, pwdCon) {
	return pwd === pwdCon;
};

userSchema.statics.createSecure = function (params, cb) {
	var isConfirmed;
	isConfirmed = confirm(params.password, params.password_confirm);

	if(!isConfirmed) {
		return cb("Passwords should match", null); //(err, user)
	}

	var that = this;

	bcrypt.hash(params.password, 12, function (err, hash) {
		params.passwordDigest = hash;
		that.create(params, cb);
	});
};

userSchema.methods.checkPswd = function (password, cb) {
	var user = this; // user
	console.log(user ); /* returns { _id: 5560bda7d209e96d20ee2409,
  									userName: 'foo4',
  									email: 'foo4',
  								passwordDigest: '$2a$12$HGuT2kwHmR0mxWRiLHSXVuUYRiATsyupMLEX3m8NbAooYpulGEFcq',
  								__v: 0 } */
	bcrypt.compare(password, this.passwordDigest, function (err, isMatch) {
		if(isMatch) {
			cb(null, user);
		}
		else {
			cb("OOPS", err);
		}
	});
};

userSchema.statics.authenticate = function (params, cb) {
	this.findOne({ // User
		userName: params.userName // { userName: 'foo4', password: 'foo4' }
	},
	function (err, user) {
		user.checkPswd(params.password, cb); // user
	}); // end findOne
};






////////////////////
var User = mongoose.model("User", userSchema);
module.exports = User;