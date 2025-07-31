const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const ProgressBarFull = document.getElementById("progressBarFull");
const submitBtn = document.getElementById("submit-btn");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let userAnswers = []
let currentSelectedAnswer = null
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


startGame = () => {
    questionCounter = 0;
    score = 0;
    userAnswers= []
    availableQuestions = [...questions];
    getNewQuestion();
}
getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
      return
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${max_questions}`;
ProgressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        choice.parentElement.classList.remove("selected", "correct" ," incorrect")
    });
    availableQuestions.splice(questionIndex, 1);
  currentSelectedAnswer = null;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        choice.forEach(c => {
            c.parentElement.classList.remove("selected")
        });
        const selectedChoice = e.target;
        selectedChoice.parentElement.classList.add("selected")
        currentSelectedAnswer = selectedChoice.dataset["number"]
    })
})
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();