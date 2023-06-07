// Get all the buttons in the game board
const buttons = document.querySelectorAll('.box');

// Set initial values
let player = 'X';
let moves = 0;
let gameEnd = false;
const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

// Function to handle the game move
function handleMove(button, index) {
	moves++;
	button.textContent = player;
	button.disabled = true;
	button.classList.remove('enabled');
	button.classList.add('disabled');
	checkWinner();
	togglePlayer();
	updateGameBoard();
}

// Function to toggle the current player
function togglePlayer() {
	if (player === 'X') {
		player = 'O';
	} else {
		player = 'X';
	}
}

// Function to check if there is a winner or a draw
function checkWinner() {
	winningConditions.forEach((condition) => {
		if (
			buttons[condition[0]].textContent === player &&
			buttons[condition[1]].textContent === player &&
			buttons[condition[2]].textContent === player
		) {
			endGame(`${player} is the winner!`);
			gameEnd = true;
		}
	});
	if (moves === 9 && !gameEnd) {
		endGame("It's a draw!");
		gameEnd = true;
	}
}

// Function to end the game and disable all buttons
function endGame(message) {
	const winnerDisplayBoard = document.querySelector('#winner-display-board');

	winnerDisplayBoard.textContent = message;
	winnerDisplayBoard.removeAttribute('hidden');
	buttons.forEach((button) => {
		button.disabled = true;
		button.classList.remove('enabled');
		button.classList.add('disabled');
	});
}

// Function to update the game board
function updateGameBoard() {
	const nextPlayer = document.querySelector('#next-player');
	const moveCount = document.querySelector('#move-count');
	nextPlayer.textContent = `Turn Played By: ${player}`;
	moveCount.textContent = `Moves Left: ${9 - moves}`;
}

// Function to reset the game
function resetGame() {
	buttons.forEach((button) => {
		button.disabled = false;
		button.classList.add('enabled');
		button.classList.remove('disabled');
		button.textContent = '';
	});
	const winnerDisplayBoard = document.querySelector('#winner-display-board');
	winnerDisplayBoard.textContent = '';
	winnerDisplayBoard.setAttribute('hidden', 'true');
	player = 'X';
	moves = 0;
	gameEnd = false;
	updateGameBoard();
}

// Function to replay the game
function replayGame() {
	resetGame();
	const winnerDisplayBoard = document.querySelector('#winner-display-board');
	winnerDisplayBoard.textContent = 'Game has been replayed!';
}

// Add event listeners to the buttons
buttons.forEach((button, index) => {
	button.addEventListener('click', () => handleMove(button, index));
});

// Add event listener to the reset button
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGame);

// Add event listener to the replay button
const replayButton = document.querySelector('#replay');
replayButton.addEventListener('click', replayGame);

// Function to enable buttons on page load
function enableButtons() {
	buttons.forEach((button) => {
		button.disabled = false;
		button.classList.add('enabled');
		button.classList.remove('disabled');
	});
}
