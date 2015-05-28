var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");
var views = path.join(process.cwd(), "views");

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});


app.post("/users", function (req, res) { // this is what the form uses...
	var newUser = req.body.user;
	db.User.createSecure(newUser, function (err, user) {
		if(user) {
			res.redirect("/game");
		}
		else {
			//res.redirect("/login");
			res.send(alert("Passwords must match."));
			//alert("Passwords must match.");

		}
	});
});

app.get("/login", function (req, res) {
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});

app.get("/game", function (req, res) {
	var gamePath = path.join(views, "game.html");
	res.sendFile(gamePath);
});

app.post("/login", function (req, res) {
	var user = req.body.user;

	db.User.authenticate(user, function (err, user) {
		if(!err) {
			res.redirect("/game");
		}
		else {
			res.redirect("/login");
		}
	});
});

// 
app.get("/testQuestions", function (req, res){
  // 
  db.Quiz.findOne({
  	title: "default"
  }, function (err, quiz) {
  	//console.log(quiz.questions)
  	res.send(quiz.questions);
  })
});


//////////////////
app.listen(3000, function () {
	console.log("localhost is working");
});