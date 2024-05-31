document.getElementById('tossButton').addEventListener('click', () => {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    document.getElementById('result').textContent = `Result: ${result}`;
});
