// Define an array of game choices
const choices = ["rock", "paper", "scissors", "lizard", "spock"];

// Initialize player and computer scores, current round, and game state
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let gameOver = false;

// Hide the "Play Again" button initially
document.getElementById("playAgain").style.display = "none";

// Function to generate a random computer choice
function computerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}