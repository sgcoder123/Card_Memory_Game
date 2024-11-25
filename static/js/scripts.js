document.addEventListener('DOMContentLoaded', () => {
    // Define the number of cards for each level
    const levels = {
        easy: 8,
        medium: 10,
        hard: 14,
        god: 18,
    };

    const gameBoard = document.getElementById('game-board');
    const timeElement = document.getElementById('time');
    const progressBar = document.getElementById('progress-bar');
    const countdownBar = document.getElementById('countdown-bar');
    const gameOverMessage = document.getElementById('game-over-message');
    const winMessage = document.getElementById('win-message');
    let time = 45;
    let timerInterval;

    // Start the game when the page loads
    startGame();

    function startGame() {
        const numCards = levels[level];
        const cards = generateCards(numCards);
        gameBoard.innerHTML = '';
        cards.forEach(card => gameBoard.appendChild(card));
        time = 45;
        timeElement.textContent = time;
        progressBar.style.width = '100%';
        countdownBar.style.width = '100%';
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTime, 1000);
    }

    // Generate card elements based on the number of cards
    function generateCards(num) {
        const cardValues = [];
        for (let i = 1; i <= num / 2; i++) {
            cardValues.push(i);
            cardValues.push(i);
        }
        shuffleArray(cardValues);

        return cardValues.map(value => createCardElement(value));
    }

    // Create a card element with the given value
    function createCardElement(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${value}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        return card;
    }

    // Flip the card when clicked
    function flipCard(card) {
        if (card.classList.contains('flipped')) return;
        card.style.transition = 'transform 0.3s'; // Increase the speed of the flip
        card.classList.add('flipped');
        const flippedCards = document.querySelectorAll('.card.flipped:not(.matched)');
        if (flippedCards.length === 2) {
            checkForMatch(flippedCards);
        }
    }

    // Check if the flipped cards match
    function checkForMatch(cards) {
        if (cards[0].dataset.value === cards[1].dataset.value) {
            cards.forEach(card => card.classList.add('matched'));
            checkForWin();
        } else {
            setTimeout(() => {
                cards.forEach(card => card.classList.remove('flipped'));
            }, 500); // Decrease the time to 500ms
        }
    }

    // Check if all cards are matched
    function checkForWin() {
        const matchedCards = document.querySelectorAll('.card.matched');
        console.log(`Matched cards: ${matchedCards.length}, Level: ${level}, Required: ${levels[level]}`); // Debugging statement
        if (matchedCards.length === levels[level]) {
            clearInterval(timerInterval);
            setTimeout(() => {
                if (level === 'god') {
                    winMessage.innerHTML = `
                        <h2>Congratulations! You matched all of the cards!!!.</h2>
                        <button onclick="restartGame()">Try Again</button>
                        <button onclick="backToLevelSelection()">Back to Level Selection</button>
                    `;
                } else {
                    winMessage.innerHTML = `
                        <h2>Congratulations! You matched all of the cards!!!.</h2>
                        <button onclick="nextLevel()">Next Level</button>
                        <button onclick="backToLevelSelection()">Back to Level Selection</button>
                    `;
                }
                winMessage.classList.remove('hidden');
                gameBoard.classList.add('hidden');
            }, 1000); // Wait for 1 second before showing the message
        }
    }

    // Shuffle the array of card values
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Update the timer every second
    function updateTime() {
        time--;
        timeElement.textContent = time;
        progressBar.style.width = `${(time / 45) * 100}%`;
        countdownBar.style.width = `${(time / 45) * 100}%`;
        if (time <= 0) {
            clearInterval(timerInterval);
            gameOverMessage.innerHTML = `
                <h2>Time is up! Game over.</h2>
                <button onclick="restartGame()">Try Again</button>
                <button onclick="backToLevelSelection()">Back to Level Selection</button>
            `;
            gameOverMessage.classList.remove('hidden');
            gameBoard.classList.add('hidden');
            // Disable further card flipping
            document.querySelectorAll('.card').forEach(card => {
                card.removeEventListener('click', () => flipCard(card));
            });
        }
    }

    function backToLevelSelection() {
        window.location.href = '/cardmemory';
    }
});