/* jshint esversion:9 */
// Define an array of game choices
const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const computerChoiceDisplay = document.querySelector(".computerChoice");
const scoreDisplay = document.getElementById("score");
const buttons = document.querySelectorAll(".choice");
const playAgainButton = document.getElementById("playAgain");
const resultText = document.querySelector(".resultText");

// Initialize player and computer scores, current round, and game state
let computer;
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let gameOver = false;

// Hide the "Play Again" button initially
playAgainButton.style.display = "none";

// Function to generate a random computer choice
function generateComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to play a round of the game
function playGame(playerChoice) {
    if (gameOver) return;

    // Generate the computer's choice
    computer = generateComputerChoice();

    // Display the computer's choice with a fade-in animation
    computerChoiceDisplay.classList.remove("fade-out");
    computerChoiceDisplay.textContent = `Computer chose ${computer}.`;

    // Determine the round result
    if (playerChoice === computer) {
        resultText.textContent = "It's a tie!";
    } else if (
        (playerChoice === "rock" && (computer === "scissors" || computer === "lizard")) ||
        (playerChoice === "paper" && (computer === "rock" || computer === "spock")) ||
        (playerChoice === "scissors" && (computer === "paper" || computer === "lizard")) ||
        (playerChoice === "lizard" && (computer === "spock" || computer === "paper")) ||
        (playerChoice === "spock" && (computer === "rock" || computer === "scissors"))
    ) {
        resultText.textContent = "You win!";
        playerScore++;
    } else {
        resultText.textContent = "Computer wins!";
        computerScore++;
    }

    // Add a fade-in animation to the result text
    resultText.classList.remove("fade-out");

    // Update and display the score
    scoreDisplay.textContent = `${playerScore} - ${computerScore}`;
    currentRound++;

    // If the game is not over, reset the text and choices for the next round after a delay
    if (currentRound <= 3) {
        setTimeout(() => {
            // Add a fade-out animation before resetting
            resultText.classList.add("fade-out");
            computerChoiceDisplay.classList.add("fade-out");

            setTimeout(() => {
                resultText.textContent = "Make your choice...";
                computerChoiceDisplay.textContent = "";
            }, 500); // Delay for 0.5 seconds
        }, 2000); // Delay for 2 seconds
    } else {
        // If the game is over, call the endGame function
        endGame();
    }
}

// Update and display the score
function updateScore() {
    document.getElementById("player1-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
}

// Function to handle the end of the game
function endGame() {

    // Update and display the final score
    updateScore();
}



/**
 * Function to handle the end of the game
 */
function endGame() {
    if (playerScore > computerScore) {
        resultText.textContent = "Game over. You win!";
    } else if (playerScore < computerScore) {
        resultText.textContent = "Game over. Computer wins!";
    } else {
        resultText.textContent = "Game over. It's a tie!";
    }

    // Disable choice buttons after the game is over
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Show the "Play Again" button and set the game state to "gameOver"
    playAgainButton.style.display = "block";
    gameOver = true;

    // Display the computer's choice for the last round
    const lastComputerChoice = generateComputerChoice();
    computerChoiceDisplay.textContent = `Computer chose ${lastComputerChoice} in the last round.`;
}

// Add click event listeners to choice buttons to play the game
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Play a round of the game if it's not over and the button is clicked
        if (currentRound <= 3 && !gameOver) {
            playGame(button.id);
        }
    });
});

// Add a click event listener to the "Play Again" button to reset the game
playAgainButton.addEventListener("click", () => {
    resetGame();
});

/**
 * Function to reset the game state
 */
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    gameOver = false;
    computer = '';

    resultText.textContent = "Make your choice...";
    scoreDisplay.textContent = "0 - 0";
    computerChoiceDisplay.textContent = "";

    buttons.forEach(button => {
        button.disabled = false;
    });

    playAgainButton.style.display = "none";
}