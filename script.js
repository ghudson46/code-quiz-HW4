// global variables
var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var container = document.getElementsByClassName("container");
var controls = document.getElementsByClassName('controls');
var restartBtn = document.getElementById("restartBtn");
var gameContainer = document.getElementById("gameContainer");
var highscores = document.getElementById("highscores");
var theme = document.getElementById("starWarsTheme");
var saberSound = document.getElementById("saberSound");
var image = document.getElementById("myimage");
var timer = document.getElementById("countdown");
var points = document.getElementById("point-counter");
const inputInitials = document.getElementById("inputInitials");
const inputScore = document.getElementById("inputScore");
const enterScore = document.getElementById("enterScore");
const lsOutput = document.getElementById("isOutput");
var r2 = document.getElementById("correct-sound");
var scream = document.getElementById("wrong-sound");
var saberSlash = document.getElementById("next-sound");
var saberDown = document.getElementById("saberDown");
var gameScore = 0;
var finishBtn = document.getElementById("finish-btn");
var startTime = 45;
var finalScore = document.getElementById("finalScore");

let shuffledQuestions, currentQuestionIndex;

// starts everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => { 
  // runs when finish button is clicked
  finishBtn.addEventListener("click", function(){
    gameContainer.classList.add('hide');
    highscores.classList.remove('hide');
  });
  // runs when start button is clicked
  startButton.addEventListener("click", startGame);
  // runs when next button is clicked
  nextButton.addEventListener("click", () => {
    saberSlash.play();
    currentQuestionIndex++;
    setNextQuestion();
  });
  
  // function that starts the game
  function startGame() {
    var interval = setInterval(() => {
      if (startTime <= 0) {
        // Game over
        timer.innerHTML = "TIMES UP";
        clearInterval(interval);
        nextButton.classList.add('hide');
        answerButtonsEl.classList.add('hide');
        questionContainerEl.classList.add('hide');
        questionEl.classList.add('hide');
        timer.classList.add('hide');
        highscores.classList.remove('hide');
        
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
  
  // selects the next question
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
  // displays content of question selected and displays on app with answer buttons
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
  
  // reset content
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
      answerButtonsEl.firstChild.removeEventListener('click', selectAnswer)
      answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
  }
  
  // selects answer and runs functions based on right or wrong choice
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
  
  // changes class of elements based on right or wrong answer
  function setStatusClass(element, correct) {
    // Shouldn't need this since you are removing the button and recreating
    // clearStatusClass(element)
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  // plays a different sound for a right or wrong answer, gives a point for a right answer and deducts 5 seconds for a wrong answer
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

  // clears the classes from previous answer results
  function clearStatusClass(element, correct) {
      element.classList.remove('correct');
      element.classList.remove('wrong');
  }

  // adds user initials and score to the local storage when the enter score button is clicked
  enterScore.onclick = function() {
    const key = inputInitials.value;
    const value = inputScore.value;
    
    restartBtn.classList.remove('hide');
    
  
    if (key && value) {
      localStorage.setItem(key, value);
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      lsOutput.innerHTML += `${key}: ${value}<br />`;
     
  }
  
  };
  
  

  // array filled with question objects that will be randomly selected for the quiz
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
        {text: 'Obi-Wan Jinn', correct: false},
        {text: 'The man with no name', correct: false},
        {text: 'Ben Kenobi', correct: true},
        {text: 'Gandalf', correct: false}
      ],
    },
    {
      question: 'In what movie did Boba Fett make is debut?',
      answers: [
        {text: 'Empire Strikes Back', correct: false },
        {text: 'A New Hope', correct: false},
        {text: 'Star Wars Holiday Special', correct: true },
        {text: 'Attack of the Clones ', correct: false }
      ],
    },
    {
      question: 'What species is Bib Fortuna?',
      answers: [
        {text: 'Twi\'lek', correct: true},
        {text: 'Nemoidian', correct: false},
        {text: 'Togruta', correct: false},
        {text: 'Caminoan', correct: false}
      ],
    },
    {
      question: 'What powers a jedi\'s lightsaber, as well as the death star\'s cannon?',
      answers: [
        {text: 'the force', correct: false},
        {text: 'gas', correct: false},
        {text: 'tibana', correct: false},
        {text: 'kyber crystals', correct: true}
      ],
    },
    {
      question: 'What is Count Dooku\'s sith name?',
      answers: [
        {text: 'Darth Nihilus', correct: false},
        {text: 'Darth Tyrannus', correct: true },
        {text: 'Darth Plagus', correct: false},
        {text: 'Darth Dooku', correct: false}
      ],
    },
    {
      question: 'Who is the commander of the Death Star in A New Hope??',
      answers: [
        {text: 'Grand Moff Tarkin', correct: true},
        {text: 'Darth Vader', correct: false},
        {text: 'Moff Gideon', correct: false},
        {text: 'Admiral Thrawn', correct: false}
      ],
    },
    {
      question: 'What species is Selacious Crumb?',
      answers: [
        {text: 'Kowakian Monkey Lizard', correct: true},
        {text: 'Space Slug', correct: false},
        {text: 'Genosian Brain Worm', correct: false},
        {text: 'Geonosian', correct: false}
      ],
    },
    {
      question: 'Which band is Sy Snootles a member of ?',
      answers: [
        {text: 'Jedi Rocks', correct: false},
        {text: 'Rontu Rockers', correct: false},
        {text: 'Evar Orbus and his Galactic Jizz Whalers', correct: true},
        {text: 'The incredible sound of Dr. Funk', correct: false}
      ],
    },
    {
      question: 'What is the wookie\'s verson of Christmas?',
      answers: [
        {text: 'life day', correct: true},
        {text: 'earth day', correct: false},
        {text: 'force day', correct: false},
        {text: 'love day', correct: false}
      ],
    },
    {
      question: 'Who was responsible for Rey and Kylo\'s connection through the force?',
      answers: [
        {text: 'Supreme Leader Snoke', correct: false},
        {text: 'Luke Skywalker', correct: false},
        {text: 'Darth Plagus', correct: false},
        {text: 'Emperor Palpetine', correct: true}
      ],
    },
    {
      question: 'What last name does Rey adopt at the end of The Rise of Skywalker?',
      answers: [
        {text: 'Kenobi', correct: false},
        {text: 'Skywalker', correct: true},
        {text: 'Palpetine', correct: false},
        {text: 'Solo', correct: false}
      ],
    },
    {
      question: 'Who trained Obi-Wan Kenobi?',
      answers: [
        {text: 'Yoda', correct: true},
        {text: 'Qui-Gon Jinn', correct: true},
        {text: 'Count Dooku', correct: false},
        {text: 'Mace Windu', correct: false}
      ],
    },
    {
      question: 'Who does Luke see behind Darth Vader\'s mask in the cave on Dagobah?',
      answers: [
        {text: 'Anakin', correct: false},
        {text: 'Padme', correct: false},
        {text: 'a lizard', correct: false},
        {text: 'himself', correct: true}
      ],
    },
    {
      question: 'Which color was not a lightsaber color in a movie or TV show?',
      answers: [
        {text: 'black', correct: false},
        {text: 'white', correct: false},
        {text: 'yellow', correct: false},
        {text: 'pink', correct: true}
      ],
    },
    {
      question: 'Which droid model was created to be a bounty hunter?',
      answers: [
        {text: 'protocol droid', correct: false},
        {text: 'IG-88', correct: true},
        {text: 'R2 units', correct: false},
        {text: 'BB units', correct: false}
      ],
    },
    {
      question: 'What is the name of the Geonosian leader?',
      answers: [
        {text: 'Poggle the Lesser', correct: true},
        {text: 'Darth Geonosia', correct: false},
        {text: 'Gardola the Hutt', correct: false},
        {text: 'Watto', correct: false}
      ],
    }
  ]
  
  });