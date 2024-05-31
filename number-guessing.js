let randomNumber;
let attempts;

function startNewGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('feedback').textContent = '';
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
}

document.getElementById('startButton').addEventListener('click', startNewGame);

document.getElementById('guessButton').addEventListener('click', () => {
    const guess = Number(document.getElementById('guessInput').value);
    attempts++;
    document.getElementById('attempts').textContent = attempts;

    if (guess === randomNumber) {
        document.getElementById('feedback').textContent = 'Congratulations! You guessed the correct number!';
        document.getElementById('guessButton').disabled = true;
    } else if (guess < randomNumber) {
        document.getElementById('feedback').textContent = 'Too low! Try again.';
    } else {
        document.getElementById('feedback').textContent = 'Too high! Try again.';
    }
});

// Initialize the game on page load
window.addEventListener('load', startNewGame);
