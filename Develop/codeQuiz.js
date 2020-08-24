var quiz = document.querySelector("#quiz");
var startquiz = document.querySelector("#startquiz");
var quesCount = 0;
var score = 0;
var clickedName = localStorage.getItem("clickedName");


const Questions = [{
    question: "1. Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "Brendan Eich"
  },
  {
    question: "2. Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "npm"
  },
  {
    question: "3. Which tool can you use to ensure code quality?",
    answers: {
      a: "ESLint",
      b: "jQuery",
      c: "RequireJS",
    },
    correctAnswer: "ESLint"
  },
  {
    question: "4. Which of the following is not a reserved word in JavaScript?",
    answers: {
      a: "interface",
      b: "throws",
      c: "program",
    },
    correctAnswer: "program"
  },
  {
    question: "5. What is the HTML tag under which one can write the JavaScript code <.......>?",
    answers: {
      a: "javascript",
      b: "scripted",
      c: "script",
    },
    correctAnswer: "script"
  }
];

function buildQuiz() {
  if (quesCount >= Questions.length){
    var result = document.getElementById("content");
    result.innerHTML = "You scored: " + score + " out of " + Questions.length + "<br>";
    var name = document.getElementById("content");
    name.innerHTML += "Enter Initials: <input type='text' id='myText' placeholder='Name'></input>";
  };
  if(quesCount===0)
  setTime();
  
  var content = document.getElementById("content");
  var chA = Questions[quesCount].answers.a;
  var chB = Questions[quesCount].answers.b;
  var chC = Questions[quesCount].answers.c;
  answer = Questions[quesCount].correctAnswer;
  content.innerHTML = "";
  content.innerHTML = "<h1>" + Questions[quesCount].question + "<br/></h1>";
  content.innerHTML += "<div><button id = 'button1' onClick=checkAnswer(this) value='" + chA + "'>" + chA + "</button></div><br>";
  content.innerHTML += "<div><button id = 'button2' onClick=checkAnswer(this) value='" + chB + "'>" + chB + "</button></div><br>";
  content.innerHTML += "<div><button id = 'button3' onClick=checkAnswer(this) value='" + chC + "'>" + chC + "</button></div><br>";
  quesCount++;
}

function checkAnswer(e) {

  var clicked = document.getElementById(e.id).value;

  if (clicked === answer) {
    score++
    localStorage.setItem("score", score);

  } else{
    secondsLeft = secondsLeft - 5;
  };
  if (quesCount < Questions.length && secondsLeft > 0){
  buildQuiz();
  } else{
    clearInterval(timerInterval);
    sendMessage();
  }
}

var secondsLeft = 60;
var timerInterval;

function setTime() {
  timerInterval = window.setInterval(function () {
    secondsLeft--;
    var Elspt = document.getElementById("time");
    Elspt.innerHTML = secondsLeft + " seconds left till Quiz Ends.";
    if (secondsLeft === 0 || secondsLeft < 0)  {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

function sendMessage() {
  var content = document.getElementById("content");
  content.innerHTML = "<h1> Quiz Over! <h1><br>";
  var result = document.getElementById("content");
  result.innerHTML += "You scored: " + score + " out of " + Questions.length + "<br>";
  var name = document.getElementById("content");
  name.innerHTML += "Enter Initials: <input type='text' id='myText' placeholder='initials'></input>";
  name.innerHTML += "<input type='button' onClick=highScores(this) value='submit'></input>";

  var Elspt = document.getElementById("time");
    Elspt.innerHTML = "";
}

function highScores(e){
  var clickedName = document.getElementById("myText").value;
  clickedName = clickedName.textContent;
  var highScore = document.getElementById("content");
  highScore.innerHTML = "<h1> High Scores </h1>";
  highScore.innerHTML += clickedName + ":" + score + "<br>";
  highScore.innerHTML += "<input type='button' onClick=reset(this) value='reset'></input>";
}
function reset(e){

  $("#content").show();
}
startquiz.addEventListener('click', buildQuiz);