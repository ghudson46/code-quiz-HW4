const question = $('#question');
const choices = $('.choice-text');
choices = choices.toArray();

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "inside which HTML element do we put the javascript?",
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1
  },

  {
    question: "What does CSS stand for?",
    choice1: 'colored stylish sheet',
    choice2: 'creative structure sheets',
    choice3: 'cascading style sheets',
    choice4: 'custom stylized sheets',
    answer: 3
  },

  {
    question: "What is the role of javascript?",
    choice1: 'it is the skeleton of the website',
    choice2: 'it stylizes the website',
    choice3: 'it tracks data',
    choice4: 'it makes the website dynamic',
    answer: 4
  },

  {
    question: "pick the right answer",
    choice1: 'wrong',
    choice2: 'right',
    choice3: 'wrong',
    choice4: 'wrong',
    answer: 2
  }
]

const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
console.log(availableQuestions);
getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    return window.location.assign("/end.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innterText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innterText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.on("click", e => {
    if (acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    console.log(selectedAnswer);
    getNewQuestion();
  });
});

startGame();
