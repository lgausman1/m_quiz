var express = require("express");
//var flash = require("connect-flash");
//var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");
var views = path.join(process.cwd(), "views");

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
// 	secret: "super Secret",
// 	cookie: {},
// 	resave: false,
// 	saveUninitialized: false
// }));

//app.use(flash());

var loginHelper = function (req, res, next) {

	req.login = function (user) {
		req.session.userId = user._id;
		console.log("user logged in");
		req.user = user;
		return user;
	};

	req.logout = function (user) {
		req.session.userId = null;
		req.user = null;
	};

	req.current_user = function (cb) {
		var userId = req.session.userId;
		db.User.findOne({
			_id: userId
		}, cb);
	};

	next();
};

app.use(loginHelper);

app.get("/", function (req, res) {
	var homePath = path.join(views, "login.html");
	res.sendFile(homePath);
});

app.get("/game", function (req, res) {
	var gamePath = path.join(views, "game.html");
	res.sendFile(gamePath);
});

app.post("/users", function (req, res) { 
	var newUser = req.body.user; 
	db.User.createSecure(newUser, function (err, user) { // err is passed from db
		if(user) {
			req.login(user);
			//res.flash('success', "User is successfully registered." ); // crashes app: TypeError: undefined is not a function
			res.redirect("/game");
		}
		else {
			//res.flash('error', err); 
			//res.redirect(loginPath);
			res.send(err);
		}
	});
});

app.get("/login", function (req, res) {
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});



app.post("/login", function (req, res) {
	var user = req.body.user;

	db.User.authenticate(user, function (err, user) {
		if(!err) {
			res.redirect("/game");
		}
		else {
			res.send(err); // renders error on page
			//res.redirect("/login");
		}
	});
});

// grab the json from the db
app.get("/testQuestions", function (req, res){
  // 
  db.Quiz.findOne({
  	title: "default"
  }, function (err, quiz) {
  	res.send(quiz.questions);
  })
});

app.get("/edit", function (req, res) {
	var editPath = path.join(views, "edit.html");
	res.sendFile(editPath);
});


app.listen(process.env.PORT || 3000);
