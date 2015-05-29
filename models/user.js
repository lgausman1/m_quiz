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


/* db.Quiz.create({
... title: "default",
... questions: [
		{
		question: String,
		choices: [String],
		correctChoice: Number,
		video: String
		}
	]
});

var db = require("./models");

db.Quiz.findById(id, function(err, video) {
	
});

// from remote node 
{ __v: 0,
  title: 'default',
  _id: 5567bc5527982a0600855a83,
  questions: 

// local code from index.js
Quiz.findById(id, function (err, tank) {
  if (err) return handleError(err);
  
  tank.size = 'large';
  tank.save(function (err) {
    if (err) return handleError(err);
    res.send(tank);
  });
});

// first _id
5567bc5527982a0600855a88

video: 'http://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0'


var db = require('./models');
5567bc5527982a0600855a83.questions.findOne({ video: 'http://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0' }, function (err, doc) {
  if (err) {
	console.log("Database error: " + err);
  }

  doc.video = 'https://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0';
  doc.save(function(err) {
	if(err){
	console.log("Data save error: " + err);
	}
  });
});
// remote node returned: Quiz is not defined
// remote node returned: TypeError: Cannot set property 'video' of null

*/




////////////////////
var User = mongoose.model("User", userSchema);
module.exports = User;