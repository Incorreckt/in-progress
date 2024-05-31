const words = ['banana', 'apple', 'orange', 'grape', 'kiwi'];
let currentWord;
let scrambledWord;

function startNewGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('word').textContent = scrambledWord;
    document.getElementById('guessInput').value = '';
    document.getElementById('feedback').textContent = '';
}

document.getElementById('startButton').addEventListener('click', startNewGame);

document.getElementById('guessButton').addEventListener('click', () => {
    const guess = document.getElementById('guessInput').value.toLowerCase().trim();

    if (guess === currentWord) {
        document.getElementById('feedback').textContent = 'Congratulations! You guessed the word!';
    } else {
        document.getElementById('feedback').textContent = 'Try again!';
    }
});

function scrambleWord(word) {
    let scrambled = '';
    const wordArray = word.split('');
    while (wordArray.length > 0) {
        const index = Math.floor(Math.random() * wordArray.length);
        scrambled += wordArray[index];
        wordArray.splice(index, 1);
    }
    return scrambled;
}

// Initialize the game on page load
window.addEventListener('load', startNewGame);
