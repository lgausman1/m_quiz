var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
		question: String,
		choices: [String],
		correctChoice: Number,
		video: String
	})

var quizSchema = new mongoose.Schema({
	title: String, // default 
	questions: [questionSchema]
});


var Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;