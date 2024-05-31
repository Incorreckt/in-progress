document.getElementById('rollButton').addEventListener('click', () => {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('result').textContent = `Result: ${result}`;
});
