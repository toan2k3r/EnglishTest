

const questionElement = document.getElementById("question");
const choiceElement = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreElement = document.getElementById("score");
const ProgressBarFull = document.getElementById("progressBarFull");
const submitBtn = document.getElementById("submit-btn");

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let selectedAnswers = []
let quizCompleted = false;

const totalTime = 300
let timeLeft = totalTime;
let timer;
let isQuizActive = true

let questions = [
    {
        question: "What is the capital of France?",
        choice1: "Berlin",
        choice2: "Madrid",
        choice3: "Paris",
        choice4: "Rome",
        answer: [3]
    },
    {
        question: "Which of the following is a programming language?",
        choice1: "Python",
        choice2: "HTML",
        choice3: "Photoshop",
        choice4: "Word",
        answer: [1]
    },
    {
        question: "Which planet is known as the Red Planet?",
        choice1: "Earth",
        choice2: "Venus",
        choice3: "Mars",
        choice4: "Jupiter",
        answer: [3]
    },
    {
        question: "Which of the following is a fruit?",
        choice1: "Carrot",
        choice2: "Banana",
        choice3: "Potato",
        choice4: "Cabbage",
        answer: [2]
    },
    {
        question: "What is the result of 3 + 4?",
        choice1: "5",
        choice2: "6",
        choice3: "7",
        choice4: "8",
        answer: [3]
    },
    {
        question: "Which of these is a type of renewable energy?",
        choice1: "Solar",
        choice2: "Coal",
        choice3: "Gasoline",
        choice4: "Oil",
        answer: [1]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choice1: "Charles Dickens",
        choice2: "William Shakespeare",
        choice3: "Mark Twain",
        choice4: "Jane Austen",
        answer: [2]
    },
    {
        question: "Which of the following is a mammal?",
        choice1: "Shark",
        choice2: "Eagle",
        choice3: "Elephant",
        choice4: "Crocodile",
        answer: [3]
    },
    {
        question: "What is the boiling point of water (at sea level)?",
        choice1: "90°C",
        choice2: "100°C",
        choice3: "110°C",
        choice4: "120°C",
        answer: [2]
    },
    {
        question: "Which of these is a web browser?",
        choice1: "Chrome",
        choice2: "Excel",
        choice3: "Word",
        choice4: "PowerPoint",
        answer: [1]
    },
    {
        question: "Which of the following is a color?",
        choice1: "Dog",
        choice2: "Run",
        choice3: "Blue",
        choice4: "Fast",
        answer: [3]
    },
    {
        question: "Which number is a prime number?",
        choice1: "4",
        choice2: "6",
        choice3: "9",
        choice4: "7",
        answer: [4]
    },
    {
        question: "Which of these countries is in Europe?",
        choice1: "Brazil",
        choice2: "Germany",
        choice3: "Japan",
        choice4: "Australia",
        answer: [2]
    },
    {
        question: "Which language is commonly used for web development?",
        choice1: "Python",
        choice2: "HTML",
        choice3: "Java",
        choice4: "C#",
        answer: [2]
    },
    {
        question: "Which of the following animals can fly?",
        choice1: "Elephant",
        choice2: "Tiger",
        choice3: "Eagle",
        choice4: "Crocodile",
        answer: [3]
    },
    {
        question: "Which of the following is an operating system?",
        choice1: "Windows",
        choice2: "Google",
        choice3: "Excel",
        choice4: "YouTube",
        answer: [1]
    },
    {
        question: "What is the largest planet in the Solar System?",
        choice1: "Earth",
        choice2: "Saturn",
        choice3: "Jupiter",
        choice4: "Mars",
        answer: [3]
    },
    {
        question: "Which of the following is a musical instrument?",
        choice1: "Guitar",
        choice2: "Table",
        choice3: "Chair",
        choice4: "Pen",
        answer: [1]
    },
    {
        question: "What is the chemical symbol for water?",
        choice1: "O2",
        choice2: "H2O",
        choice3: "CO2",
        choice4: "HO",
        answer: [2]
    },
    {
        question: "Which of the following is a mammal?",
        choice1: "Snake",
        choice2: "Cat",
        choice3: "Lizard",
        choice4: "Fish",
        answer: [2]
    }
];

const correct_bonus = 10;
const max_questions = 10;

function initGame() {
    score = 0;
    questionCounter = 0
    selectedAnswers = []
    quizCompleted = false
    availableQuestions = [...questions]
    scoreElement.textContent = score
    loadQuestion();
    starTime()
}

function loadQuestion() {
    if (!isQuizActive || timeLeft <= 0) return;
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        return endGame();
    }
    // Reset UI
    choiceElement.forEach(choice => {
        choice.parentElement.classList.remove("selected", "correct", "incorrect");
        choice.parentElement.style.pointerEvents = "auto"
    });
    questionCounter++;
    updateProgress();
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    availableQuestions.splice(questionIndex, 1);

    questionElement.textContent = currentQuestion.question;
    choiceElement.forEach(choice => {
        const number = choice.dataset.number;
        choice.textContent = currentQuestion['choice' + number]
    });
}

function updateProgress() {
    progressText.textContent = `Question ${questionCounter}/ ${max_questions}`
    ProgressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`
}

choiceElement.forEach(choice => {
    choice.addEventListener("click", () => {
         if(!isQuizActive || timeLeft <= 0 ) return;
        if (quizCompleted) return;
        choiceElement.forEach(c => {
            c.parentElement.classList.remove("selected")
        });
        choice.parentElement.classList.add("selected");
        selectedAnswers[questionCounter - 1] = {
            question: currentQuestion.question,
            userChoice: parseInt(choice.dataset.number),
            correctAnswer: currentQuestion.answer[0],
            choices: {
                1: currentQuestion.choice1,
                2: currentQuestion.choice2,
                3: currentQuestion.choice3,
                4: currentQuestion.choice4
            }
        };
        setTimeout(() => {
            if (!quizCompleted) {
                loadQuestion()
            }
        }, 1000)
    });
});

submitBtn.addEventListener("click", () => {
    if (quizCompleted) {
        return showResults();
    }
    quizCompleted = true;
    calculateScore();
    showResults();
});

function calculateScore() {
    score = selectedAnswers.reduce((total, answer) => {
        return total + (answer.userChoice === answer.correctAnswer ? correct_bonus : 0);
    }, 0);
    scoreElement.textContent = score;
}

function showResults() {
    clearInterval(timer)
    let resultsHTML = `<div class="results-container">
            <h2>Quiz Results</h2>
            <p>Your score: ${score}/${max_questions * correct_bonus}</p>
            <div class="answers-review">
    `;
    selectedAnswers.forEach((answer, index) => {
        const isCorrect = answer.userChoice === answer.correctAnswer;
        resultsHTML += ` <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
                <h3>Question ${index + 1}: ${answer.question}</h3>
                <p>Your answer: ${answer.choices[answer.userChoice]} ${!isCorrect ?
                `(Correct: ${answer.choices[answer.correctAnswer]})` : ''}</p>
            </div>`;
    });
    resultsHTML += ` </div>
            <button onclick="location.reload()">Restart Quiz</button>
        </div>`;
    document.getElementById("game").innerHTML = resultsHTML;
    resultsHTML += `<p>Time remaining: ${formatTime(timeLeft)}</p>`
}
function starTime() {
    clearInterval(timer)
    updateTimerDisplay()

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 30) {
            document.getElementById("time").classList.add("time-warning")
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
            alert("Time Up! Your quiz has been submitted automatically.");
        }
    }, 1000)

}
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("time").textContent =
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
function fomatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60
    return `${mins}m ${secs}s`
}


function endGame() {
    isQuizActive = false;
    clearInterval(timer);
    calculateScore();
    quizCompleted = true;
    submitBtn.textContent = "Show Results"
}
initGame();
