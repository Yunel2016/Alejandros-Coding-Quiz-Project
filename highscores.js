const highScoresList = document.getElementById("high-scores-list");

// Load and display high scores from local storage
function loadHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    highScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1
