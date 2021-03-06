$(function () {

	$.get("/testQuestions").
		done(function (data) {
			//console.log("DATA", data);
			start(data);
		});

	function start(testQuestions) {
			var quizTemp = _.template($("#tmpl-quiz").html());

			var currentQuestion = 0;
			var score = 0;
			var len = testQuestions.length;
			var numChoices = testQuestions[currentQuestion].choices.length;
			
			var $choiceList = $('#list');
			var choicesGroup = document.getElementsByName('choicesGroup'); 
			var $nextButton = $('<button id="nextButton" class="btn btn-primary">next</button>');
			var $prevButton = $('<button id="prevButton" class="btn btn-primary margin-right">previous</button>');
			var $question = $('#question');
			var $vidDiv = $('#video');
			var $btnDiv = $("#buttonDiv");
			
			$btnDiv.append($prevButton, $nextButton);
			

			function buildQuiz() {
				var $question = $(quizTemp(testQuestions[currentQuestion]));
				var questionId = testQuestions[currentQuestion]._id;
				//console.log(questionId);
				var $questionCon = $("#questionCon");

				$questionCon.html("");
				$questionCon.append($question);
				
				// logic for previous button
				 if(currentQuestion > 0) {
				 	$prevButton.show();
				 	} else if (currentQuestion === 0) {
				 	$prevButton.hide();
				 	}

			} // end buildQuiz
			
		// build next question function
		$nextButton.on('click', function() {
			var userChoice = false;
			
			for(var j = 0; j < choicesGroup.length; j++) {  
				//see if choice is selected and a match to correctChoice
				if(choicesGroup[j].checked) {
					userChoice = true;
					
					if(j === testQuestions[currentQuestion].correctChoice) { 
						// append 'correct' to li
						$(choicesGroup[j]).closest("li").addClass("bg-success msg-padding").append("<span class='pull-right'>Correct!</span>");

						score++;

						}
						else {
							// append 'incorrect' answer to li
							$(choicesGroup[j]).closest("li").addClass("bg-danger msg-padding").append("<span class='pull-right'>Sorry, incorrect!</span>");

						}
					}

			}
			// send error message if no choice is selected
			if(!userChoice) {
				$("#msgDiv").addClass("alert alert-danger small").append("<span class='glyphicon glyphicon-exclamation-sign pull-left'></span><p> &nbsp; Please select a quiz choice!</p>");

				return false;
				}
			
			currentQuestion++;
			
			$choiceList.empty();
			$vidDiv.empty();
			// conditions to continue quiz
			if(currentQuestion < len) {
				
					setTimeout(function() {
						buildQuiz();
					}, 2000);

			}
			else {

				//append score and correct answers
				var answersGroup = document.createDocumentFragment();
				var answersList = $('ol');
				
				$.each(testQuestions, function(i, answer) { // passes in key, value
						
					var $li = $('<li>');
					// should be var answer!!
					var answer = testQuestions[i].choices[this.correctChoice];
					
					$(answersGroup).append($li);
					$li.append(answer);
					
					}); // end $.each$(answerGroup).append(answerList);	
				var answerH; // answer header
				// evaluate score
				if(score >= 4) {
					answerH = "Congratulations! You scored " + score + " out of " + len + " correct.";
					}
				else if(score > 2) {
					answerH = "Not bad. You scored " + score + " out of " + len + " correct.";
					}
				else {
					answerH = "Better luck next time. You scored " + score + " out of " + len + " correct.";
					}
						
				$('#question').empty();
				$('#question').append(answerH + "<br><br>The correct answers are:");
				$('#buttonDiv').empty(); 
				$('#list').empty();
				//append response with score
				$('#list').append(answersGroup);
				}
			
			});

		// go back to previous video and quiz choices, decrement score
		$prevButton.on('click', function() {
			currentQuestion--;
			//score--;
			$choiceList.empty();
			$vidDiv.empty();
			buildQuiz();

			});


		buildQuiz();
	}
});
