
var db = require('./models');

db.Quiz.findOne({
	title: 'default'
	 questions: {
	 	$elemMatch: {
	 		video: 'http://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0'}
	 }
}, function (err, quiz) {
	console.log("QUERY!!!!!")
	if (err) {
		console.log("Bad query: " + err);
		}
	console.log(quiz);
	
});

////////// from models/user.js
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

/* 
var db = require('./models');
mongo code:
db.Quiz.findOne(
{
	title: 'default',
	function (err, quiz) {
	x = quiz;
	}	
	x.questions // returns the array of question objects
	x.questions[0] // returns the first question object

	x.questions.filter(function(obj) { // returns entire object
		return obj.video == 'http://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0'
	})
	// set video url
	x.questions[0].video = 'https://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0'
});

this is mongo code:
db.Quiz.findOne({
  title: 'default',
  query: function(err, quiz) {
    x = quiz;
    console.log(x); }
});

this is from heroku
var doc = db.Quiz.questions.id('_id: 556651239668463529bdb2be'); 
console.log(doc);

returned:

  _conditions: { questions: { '$elemMatch': [Object] }, title: 'default' },
Quiz.questions.question.video
Quiz.

> QUERY!!!!!
{ _id: 556651239668463529bdb2b9,
  title: 'default',
  __v: 0,
  questions: 
   [ { question: 'Name that tune. Is it:',
       correctChoice: 1,
       video: 'http://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
       _id: 556651239668463529bdb2be,
       choices: [Object] },
     { question: 'Name the performers. Is it:',
       correctChoice: 2,
       video: 'http://www.youtube.com/embed/zV2GA63HEGk?rel=0&amp;start=105&amp;end=146&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
       _id: 556651239668463529bdb2bd,
       choices: [Object] },
     { question: 'Which state in the US was Madonna born in:',
       correctChoice: 3,
       video: 'https://www.youtube.com/embed/QL6jeKUGFv0?rel=0&amp;start=184&amp;end=202&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
       _id: 556651239668463529bdb2bc,
       choices: [Object] },
     { question: 'Name this performer. Is it:',
       correctChoice: 1,
       video: 'https://www.youtube.com/embed/OPf0YbXqDm0?rel=0&amp;start=93&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
       _id: 556651239668463529bdb2bb,
       choices: [Object] },
     { question: 'Name the featured female vocalist. Is it:',
       correctChoice: 3,
       video: 'https://www.youtube.com/embed/iEeD5G22Rqs?rel=0&amp;start=139&amp;end=184&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
       _id: 556651239668463529bdb2ba,
       choices: [Object] } ] }

VLC media player
*/


/* 

ERROR MESSAGE FOR FORM VALIDATION: 
{"name":"MongoError","message":"insertDocument :: caused by :: 11000 E11000 duplicate key error index: heroku_app37287249.users.$userName_1  dup key: { : \"lindag\" }","index":0,"code":11000,"errmsg":"insertDocument :: caused by :: 11000 E11000 duplicate key error index: heroku_app37287249.users.$userName_1  dup key: { : \"lindag\" }"}
 */



 ////////////// from catchphrases /////////////


app.post("/update", function(req, res){
  console.log("updating phrase with these params", req.body);
  // not using findByIdAndUpdate because I want to individually check
  // if we have new values for our word, definition
  db.Phrases.findById(req.body.id, function (err, phrase) {
    if (err) {
      res.status(500).send({ error: 'database find error' });
    } else {
      if (req.body.word) {
        // if form gave us a new word, update the phrase's word
        phrase.word = req.body.word;
      }
      if (req.body.definition){
        // if form gave us a new definition, update that
        phrase.definition = req.body.definition;
      }
      // save the updated document
      phrase.save(function (err) {
        if (err){
          res.status(500).send({ error: 'database save error' });
        }
      });
    }
  });
  res.status(200).send();
});

app.delete("/phrases/:id", function (req, res){
  // remove item in the db matching the id
  db.Phrases.remove({_id: req.params.id}, function(err, results){
    if (err){
      res.status(500).send({ error: 'database error' });
    } else {
      res.status(200).send();
    }
  });
});

//////////////////


users:

> [ { _id: 556098c54210f77e0d3907ea,
    userName: 'foo',
    email: 'foo',
    passwordDigest: 'foo',
    __v: 0 },
  { _id: 5560bda7d209e96d20ee2409,
    userName: 'foo4',
    email: 'foo4',
    passwordDigest: '$2a$12$HGuT2kwHmR0mxWRiLHSXVuUYRiATsyupMLEX3m8NbAooYpulGEFcq',
    __v: 0 },
  { _id: 5560bf16d209e96d20ee240a,
    userName: 'foo5',
    email: 'foo5',
    passwordDigest: '$2a$12$HWGlH5t7HzaKpMzwXEj5y.JjCcwJfGqGuHiIlF.VHgL.9xNO7HTCW',
    __v: 0 },
  { _id: 55664081c231fb3915c5db60,
    userName: 'lindag',
    email: 'l.gausman@comcast.net',
    passwordDigest: '$2a$12$hRw.ZyDPFZTgIOC0aj/BH.eqp3zPUN9hMXJBN12MTWsV5Vlt00Z3W',
    __v: 0 },
  { _id: 5566608a12ed314738c78593,
    userName: 'mary',
    email: 'mary@abc.com',
    passwordDigest: '$2a$12$wSrgMCovoWJOeodHCusSQ.D19yo2MkiuQPKHeYqFyD5DNY0zPZ/Na',
    __v: 0 },
  { _id: 55679bc46bc011929728e911,
    userName: 'dpilcher',
    email: 'daimeon.pilcher@gmail.com',
    passwordDigest: '$2a$12$ftw.40CTeu/HVJmJ8I7BCuVZDWXxp.SQWEAg/DnNijLC6FXf9/MHu',
    __v: 0 } ]