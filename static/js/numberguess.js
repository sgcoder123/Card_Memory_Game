let maxNumber;
if (level === 'easy') {
    maxNumber = 10;
} else if (level === 'medium') {
    maxNumber = 20;
} else {
    maxNumber = 30;
}
let randomNumber = Math.floor(Math.random() * maxNumber) + 1;
let attempts = 0;
const maxAttempts = 10;

document.getElementById('range').textContent = `Guess a number between 1 and ${maxNumber}.`;

function checkGuess() {
    const userGuess = document.getElementById('guess').value;
    const message = document.getElementById('message');
    const status = document.getElementById('status');
    const submitButton = document.getElementById('submit');
    attempts++;

    if (attempts <= maxAttempts) {
        if (userGuess == randomNumber) {
            message.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
            message.style.color = 'green';
            submitButton.disabled = true;
        } else if (userGuess > randomNumber) {
            message.textContent = 'Too high! Try again.';
            message.style.color = 'red';
        } else {
            message.textContent = 'Too low! Try again.';
            message.style.color = 'red';
        }
        status.textContent = `You have ${maxAttempts - attempts} attempts left.`;
    } else {
        message.textContent = `Sorry, you've reached the maximum number of attempts (${maxAttempts}). The number was ${randomNumber}.`;
        message.style.color = 'red';
        submitButton.disabled = true;
        status.textContent = 'No attempts left.';
    }
}