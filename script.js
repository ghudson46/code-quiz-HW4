var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

let shuffledQuestions, currentQuestionIndex;

// var counter = 0;
// var timeLeft = 90;

// function convertSeconds(s) {
//   var min = foor(s / 60);
//   var sec = 2 % 60;
//   return nf(min, 2) + ' : ' + nf(sec, 2);
// }

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});


function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove('hide');
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
    question: 'what is 2 + 2?',
    answers: [
      {text: '4', correct: true},
      {text: '22', correct: false},
      {text: '6', correct: false},
      {text: '2', correct: false}
    ],
  },
  {
    question: 'what is 5 + 7?',
    answers: [
      {text: '4', correct: false},
      {text: '57', correct: false},
      {text: '12', correct: true},
      {text: '13', correct: false}
    ],
  }
]