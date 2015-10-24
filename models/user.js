var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
// removed unique value
var userSchema = new mongoose.Schema({
	userName: { 
		type: String, 
		required: true,
	},
	email: { 
		type: String, 
		required: true, 
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
		var err = "Passwords don't match.";
		return cb(err, null); //(err, user) throws ReferenceError: err is not defined
		//append error message to document
	}
	// this is currently pointing to userSchema
	var that = this; 

	bcrypt.hash(params.password, 12, function (err, hash) {
		params.passwordDigest = hash;
		that.create(params, cb);
	});
};

userSchema.methods.checkPswd = function (password, cb) {
	var user = this; 
	console.log(user ); 

// compare(data, encrypted, cb)
// data - [REQUIRED] - data to compare.
// encrypted - [REQUIRED] - data to be compared to.
// callback - [REQUIRED] - a callback to be fired once the data has been compared.
// error - First parameter to the callback detailing any errors.
// result - Second parameter to the callback providing whether the data and encrypted forms match [true | false].

	bcrypt.compare(password, this.passwordDigest, function (err, isMatch) {
		if(isMatch) {
			cb(null, user);
		}
		else {
			cb("Password is invalid.", err); // flash throws error: TypeError: undefined is not a function
		}                                   // without flash throws error: ReferenceError: err is not defined
	});
};

userSchema.statics.authenticate = function (params, cb) {
	this.findOne({ 
		email: params.email 
	},
	function (err, user) {
            if (user) user.checkPswrd(params.password, cb);
            else cb("Login failed - no user found"); // passes to html on /login

	}); // end findOne
};


var User = mongoose.model("User", userSchema);
module.exports = User;

