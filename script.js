var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var theme = document.getElementById("starWarsTheme");
var saberSound = document.getElementById("saberSound");
var image = document.getElementById("myimage");
var timer = document.getElementById("countdown");
var points = document.getElementById("point-counter");
var r2 = document.getElementById("correct-sound");
var scream = document.getElementById("wrong-sound");
var saberSlash = document.getElementById("next-sound");
var saberDown = document.getElementById("saberDown");
var gameScore = 0;
var finishBtn = document.getElementById("finish-btn");
var startTime = 45;
var finalScore = document.getElementById("finalScore");

let shuffledQuestions, currentQuestionIndex;

document.addEventListener('DOMContentLoaded', () => { 

  startButton.addEventListener("click", startGame);
  nextButton.addEventListener("click", () => {
    saberSlash.play();
    currentQuestionIndex++;
    setNextQuestion();
  });
  
  function startGame() {
    var interval = setInterval(() => {
      if (startTime <= 0) {
        // Game over
        timer.innerHTML = "TIMES UP";
        clearInterval(interval);
        nextButton.classList.add('hide');
        answerButtonsEl.classList.add('hide');
        finishBtn.innerText = 'Finish';
        finishBtn.classList.remove('hide');
        document.getElementById('myimage').src="assets/gameover.jpg"
        questionEl.innerHTML = "CLICK FINISH TO ENTER YOUR SCORE";
      } else {
        timer.innerHTML = 'TIME LEFT: ' + startTime;
        startTime--;
      }
    }, 1000);
    saberSound.play();
    startButton.classList.add('hide');
    timer.classList.remove('hide');
    points.classList.remove('hide');
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
      answerButtonsEl.firstChild.removeEventListener('click', selectAnswer)
      answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setScore(correct)
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      finishBtn.innerText = 'Finish';
      finishBtn.classList.remove('hide');
    }
  }
  
  
  function setStatusClass(element, correct) {
    // Shouldn't need this since you are removing the button and recreating
    // clearStatusClass(element)
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  function setScore(correct) {
    if (correct) {
      r2.play();
      gameScore++;
      points.innerHTML = 'SCORE: ' + gameScore; 
    } else {
      scream.play();
      startTime = startTime - 5;
      
    }
  }

  function showFinalScore(){
    var finalScore = gameScore;
    finalScore.innerHTML = 'FINAL SCORE: ' + gameScore;
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
        {text: 'The Boonta Eve Classic', correct: true},
        {text: 'The tatooine Cup', correct: false},
        {text: 'The Republic Raceway 500', correct: false}
      ],
    },
    {
      question: 'Who is Rey\'s grandfather?',
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
    },
    {
      question: 'Who was deemed the chosen one?',
      answers: [
        {text: 'Baby Yoda', correct: false},
        {text: 'Yoda', correct: false},
        {text: 'Luke Skywalker', correct: false},
        {text: 'Anakin Skywalker', correct: true}
      ],
    },
    {
      question: 'What is Kylos Ren\'s real name?',
      answers: [
        {text: 'Ben Skywalker', correct: false},
        {text: 'Ben Solo', correct: true},
        {text: 'Kyle Rey', correct: false},
        {text: 'Anakin Skywalker III', correct: false}
      ],
    },
    {
      question: 'Who ordered the execution of order 66?',
      answers: [
        {text: 'Yoda', correct: false},
        {text: 'Darth Vader', correct: false},
        {text: 'Darth Maul', correct: false},
        {text: 'Darth Sideous', correct: true}
      ],
    },
    {
      question: 'What planet is Boba Fett\'s armor from?',
      answers: [
        {text: 'Camino', correct: false},
        {text: 'Naboo', correct: false},
        {text: 'Mandalor', correct: true},
        {text: 'Tatooine', correct: false}
      ],
    },
    {
      question: 'What was Obi-Wan Kebobi\'s alias when he went into hiding?',
      answers: [
        {text: 'Obi-Wan Ginn', correct: false},
        {text: 'The man with no name', correct: false},
        {text: 'Ben Kenobi', correct: true},
        {text: 'Gandalf', correct: false}
      ],
    }
  ]
  
  });