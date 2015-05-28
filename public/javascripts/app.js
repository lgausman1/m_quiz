$(function () {

	$.get("/testQuestions").
		done(function (data) {
			console.log("DATA", data)
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
				
				var $questionCon = $("#questionCon");

				$questionCon.html("");
				$questionCon.append($question);
								
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
						score++;
						}
					}

			}
			
			if(!userChoice) {
				alert("Please select a quiz choice!");
				return false;
				}
			
			currentQuestion++;
			
			$choiceList.empty();
			$vidDiv.empty();
			
			if(currentQuestion < len) {
			buildQuiz();
			}
			else {
				//append score and correct answers

				var answersGroup = document.createDocumentFragment();
				
				$.each(testQuestions, function(i, answer) { // passes in value, key 
						
					var $li = $('<li>');
					
					answer = testQuestions[i].choices[this.correctChoice];
					
					$(answersGroup).append($li);
					$li.append(answer);
					
					}); // end $.each
					
				var answerH;
				
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

		$prevButton.on('click', function() {
			currentQuestion--;
			score--;
			$choiceList.empty();
			$vidDiv.empty();
			buildQuiz();
			});


		buildQuiz();
	}
});
