var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var theme = document.getElementById("starWarsTheme");
var saberSound = document.getElementById("saberSound");
var image = document.getElementById("myimage");

let shuffledQuestions, currentQuestionIndex;

// var counter = 0;
// var timeLeft = 90;

// function convertSeconds(s) {
//   var min = foor(s / 60);
//   var sec = 2 % 60;
//   return nf(min, 2) + ' : ' + nf(sec, 2);
// }
setTimeout(function img(){
  image.style.display = 'flex';
  theme.play();
},1000);

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  saberSound.play();
  setNextQuestion();
});


function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove('hide');
  theme.pause();
  saberSound.play();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsEl.appendChild(button);
  })
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'restart';
    startButton.classList.remove('hide');
  }
  
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element, correct) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

var questions = [
  {
    question: 'What is the name of Han Solo\'s ship?',
    answers: [
      {text: 'Millenium Falcon', correct: true},
      {text: 'X-wing', correct: false},
      {text: 'The dauntless', correct: false},
      {text: 'The Enterprise', correct: false}
    ],
  },
  {
    question: 'What species is Chewbacca?',
    answers: [
      {text: 'Gungan', correct: false},
      {text: 'Protocol Droid', correct: false},
      {text: 'Wookie', correct: true},
      {text: 'Human', correct: false}
    ],
  },
  {
    question: 'What did Luke Skywalker\'s aunt and uncle do on Tatooine?',
    answers: [
      {text: 'Bounty Hunters', correct: false},
      {text: 'Smugglers', correct: false},
      {text: 'Jedi', correct: false},
      {text: 'Moisture Farmers', correct: true}
    ],
  },
  {
    question: 'How many languages is C-3P0 fluent in?',
    answers: [
      {text: '7', correct: false},
      {text: '6 million', correct: true},
      {text: '4 thousand', correct: false},
      {text: '1', correct: false}
    ],
  },
  {
    question: 'What color is Mace Windu\'s ligtsaber?',
    answers: [
      {text: 'red', correct: false},
      {text: 'purple', correct: true},
      {text: 'blue', correct: false},
      {text: 'green', correct: false}
    ],
  },
  {
    question: 'How many sith can there be at one time?',
    answers: [
      {text: '5', correct: false},
      {text: '1', correct: false},
      {text: '300', correct: false},
      {text: '2', correct: true}
    ],
  },
  {
    question: 'What is the galaxy\'s largets pod race?',
    answers: [
      {text: 'The Wattoo 3000', correct: false},
      {text: 'The Boonta Eve Classi', correct: true},
      {text: 'The tatooine Cup', correct: false},
      {text: 'The Republic Raceway 500', correct: false}
    ],
  },
  {
    question: 'Who is Rey\'s gransfather?',
    answers: [
      {text: 'Emperor Palpetine/Darth Sideous', correct: true},
      {text: 'Obi-Wan Kenobi', correct: false},
      {text: 'Luke Skywalker', correct: false},
      {text: 'Selacious B. Crumb', correct: false}
    ],
  },
  {
    question: 'Who provided the DNA to create the clone army?',
    answers: [
      {text: 'Boba Fett', correct: false},
      {text: 'Jango Fett', correct: true},
      {text: 'Darth Vader', correct: false},
      {text: 'Jar-Jar Binks', correct: false}
    ],
  },
  {
    question: 'How and where does Darth Maul die?',
    answers: [
      {text: 'Obi-Wan cuts him and half and he falls to his death on Naboo', correct: false},
      {text: 'He crashes his spaceship into a star destroyer over Kashyk', correct: false},
      {text: 'Ahsoka Tano force pushes him into a sith dagger', correct: false},
      {text: 'Obi-Wan defeats him in combat on Tatooine and he dies in his arms', correct: true}
    ],
  }
]