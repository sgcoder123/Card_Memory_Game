let maxNumber;
if (level === 'easy') {
    maxNumber = 10;
} else if (level === 'medium') {
    maxNumber = 20;
} else {
    maxNumber = 30;
}

var music = document.getElementById('background-music');
if (sessionStorage.getItem('music_enabled') === 'true') {
    music.play();
} else if (sessionStorage.getItem('music_enabled') === null) {
    if (confirm("Do you want to enable background music?")) {
        music.play();
        sessionStorage.setItem('music_enabled', 'true');
    } else {
        sessionStorage.setItem('music_enabled', 'false');
    }
}

function generateRandomNumber(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % max) + 1;
}

let randomNumber = generateRandomNumber(maxNumber);
let attempts = 0;
const maxAttempts = 10;

document.getElementById('range').textContent = `Guess a number between 1 and ${maxNumber}.`;

function checkGuess() {
    const userGuess = document.getElementById('guess').value;
    const message = document.getElementById('message');
    const status = document.getElementById('status');
    const submitButton = document.getElementById('submit');
    attempts++;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > maxNumber) {
        message.textContent = `Please enter a valid number between 1 and ${maxNumber}.`;
        message.style.color = 'orange';
        attempts--; // Do not count invalid attempts
        return;
    }

    if (attempts <= maxAttempts) {
        if (userGuess == randomNumber) {
            message.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
            message.style.color = 'green';
            submitButton.disabled = true;
            status.style.display = 'none'; // Hide the status
        } else if (userGuess > randomNumber) {
            message.textContent = 'Too high! Try again.';
            message.style.color = 'red';
            status.textContent = `You have ${maxAttempts - attempts} attempts left.`;
        } else {
            message.textContent = 'Too low! Try again.';
            message.style.color = 'red';
            status.textContent = `You have ${maxAttempts - attempts} attempts left.`;
        }
    } else {
        message.textContent = `Sorry, you've reached the maximum number of attempts (${maxAttempts}). The number was ${randomNumber}.`;
        message.style.color = 'red';
        submitButton.disabled = true;
        status.textContent = 'No attempts left.';
    }
}

function restartGame() {
    attempts = 0;
    randomNumber = generateRandomNumber(maxNumber);
    document.getElementById('guess').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('status').textContent = `You have ${maxAttempts} attempts left.`;
    document.getElementById('status').style.display = 'block';
    document.getElementById('submit').disabled = false;
}

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
});

function nextLevel() {
    let nextLevel;
    if (level === 'easy') {
        nextLevel = 'medium';
    } else if (level === 'medium') {
        nextLevel = 'hard';
    } else {
        nextLevel = 'easy';
    }
    window.location.href = `/numberguess?level=${nextLevel}`;
}