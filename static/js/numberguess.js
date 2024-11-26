let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;

function checkGuess() {
    const userGuess = document.getElementById('guess').value;
    const message = document.getElementById('message');
    attempts++;

    if (attempts <= maxAttempts) {
        if (userGuess == randomNumber) {
            message.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
            message.style.color = 'green';
        } else if (userGuess > randomNumber) {
            message.textContent = 'Too high! Try again.';
            message.style.color = 'red';
        } else {
            message.textContent = 'Too low! Try again.';
            message.style.color = 'red';
        }
    } else {
        message.textContent = `Sorry, you've reached the maximum number of attempts (${maxAttempts}). The number was ${randomNumber}.`;
        message.style.color = 'red';
    }
}
