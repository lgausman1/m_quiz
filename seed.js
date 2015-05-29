var db = require("./models");

db.Quiz.create({
  title: "default",
  questions: 
[
{ question: 'What does "Gangnam" in this song come from? Is it:',
  correctChoice: 1,
  video: 'https://www.youtube.com/embed/CH1XGdu-hzQ?rel=0&amp;start=150&amp;end=182&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
  choices: 
   [ 'The name of the performer', 'A high-fashion shopping district in Seoul', 'A favorite South Korean food', 'None of the above' ]}
{ question: 'Name that tune. Is it:',
  correctChoice: 1,
  video: 'http://www.youtube.com/embed/nrnZSLwfzVs?rel=0&amp;start=105&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
  choices: 
   [ 'Chant Down Babylon',
     'I Shot the Sheriff',
     'No Woman, No Cry',
     'Moon River' ] }

{ question: 'Name the performers. Is it:',
  correctChoice: 2,
  video: 'http://www.youtube.com/embed/zV2GA63HEGk?rel=0&amp;start=105&amp;end=146&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
  choices: 
   [ 'John Legend and The Black-eyed Peas',
     'Pharrell Williams and Swedish House Mafia',
     'Pharrell Williams and Daft Punk',
     'Fareed Zakaria and GPS' ] }

{ question: 'Which state in the US was Madonna born in?',
  correctChoice: 3,
  video: 'https://www.youtube.com/embed/GuJQSAiODqI?rel=0&amp;start=99&amp;end=123&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
  choices: [ 'New York', 'Texas', 'Hawaii', 'Michigan' ] }

{ question: 'Name this performer. Is it:',
  correctChoice: 1,
  video: 'https://www.youtube.com/embed/OPf0YbXqDm0?rel=0&amp;start=93&amp;end=141&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
  choices: [ 'James Brown, Jr.', 'Bruno Mars', 'Miguel', 'Wiz Khalifa' ] }

{ question: 'Name the featured female vocalist. Is it:',
  correctChoice: 3,
  video: 'https://www.youtube.com/embed/iEeD5G22Rqs?rel=0&amp;start=139&amp;end=184&amp;autoplay=1&amp;autohide=1&amp;showinfo=0',
  choices: 
   [ 'Taylor Swift', 'Nicki Minaj', 'Mariah Carey', 'Christina Aguilera' ]}]
 }, function (err, quiz) {
  console.log("DB HAS BEEN SEEDED WITH DATA", quiz)
 });
