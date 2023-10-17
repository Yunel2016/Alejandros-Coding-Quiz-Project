const questions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
        correct: 1
    },
    {
        question: "What is the purpose of JavaScript?",
        answers: ["Styling web pages", "Adding interactivity to web pages", "Creating databases"],
        correct: 1
    },
    {
        question: "What is a variable in programming?",
        answers: ["A container for data", "A type of loop", "A function declaration"],
        correct: 0
    },
    // Add more questions...
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 60;
let timerInterval;

const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-score");
const timeRemainingElement = document.getElementById("time-remaining");

function startQuiz() {
    // Hide the start screen
    const startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";

    // Start the timer and display the first question
    startTimer();
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(questionIndex) {
    if (questionIndex < questions.length) {
        // Display the question and answer choices
        questionText.textContent = questions[questionIndex].question;
        answerList.innerHTML = "";
        for (let i = 0; i < questions[questionIndex].answers.length; i++) {
            const answerItem = document.createElement("li");
            answerItem.textContent = questions[questionIndex].answers[i];
            answerItem.addEventListener("click", function() {
                checkAnswer(i);
            });
            answerList.appendChild(answerItem);
        }
    } else {
        // No more questions, end the quiz
        endQuiz();
    }
}

function checkAnswer(answerIndex) {
    // Check if the selected answer is correct and update the score
    if (answerIndex === questions[currentQuestionIndex].correct) {
        score++;
    } else {
        // Deduct time for incorrect answers
        timeRemaining -= 10;
    }
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
}

function startTimer() {
    // Start the timer countdown
    timerInterval = setInterval(function() {
        timeRemaining--;
        timeRemainingElement.textContent = timeRemaining;
        if (timeRemaining <= 0 || currentQuestionIndex >= questions.length) {
            // End the quiz when time runs out or all questions are answered
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    // Clear the timer
    clearInterval(timerInterval);

    // Hide the question screen and show the end screen
    const questionScreen = document.getElementById("question-screen");
    const endScreen = document.getElementById("end-screen");
    questionScreen.style.display = "none";
    endScreen.style.display = "block";

    // Display the final score and allow initials submission
    finalScore.textContent = score;
    submitButton.addEventListener("click", function() {
        const initials = initialsInput.value.trim();
        if (initials !== "") {
            // Save the score and initials to local storage
            const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            highScores.push({ initials, score });
            localStorage.setItem("highScores", JSON.stringify(highScores));

            // Redirect to a high scores page
            window.location.href = "highscores.html";
        }
    });
}

startButton.addEventListener("click", startQuiz);
