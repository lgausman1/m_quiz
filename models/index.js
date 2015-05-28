var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mQuiz_app");

module.exports.User = require("./user");
module.exports.Quiz = require("./quiz")

