var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost/mQuiz_app");

mongoose.connect( process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL || 
               "mongodb://localhost/mQuiz_app");

module.exports.User = require("./user");
module.exports.Quiz = require("./quiz")

