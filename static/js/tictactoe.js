const cells = document.querySelectorAll('.tic-tac-toe-cell');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let difficulty = document.getElementById('difficulty-level').value;

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

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
});

function updateStatus(message = `Player ${currentPlayer}'s turn`) {
    const status = document.querySelector('.tic-tac-toe-status');
    status.textContent = message;
}

function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '' && !checkWinner(board)) {
            cell.textContent = currentPlayer; // Show 'X' on the cell when clicked
            board[index] = currentPlayer;
            if (checkWinner(board)) {
                updateStatus(`${currentPlayer} wins!`);
            } else if (board.every(cell => cell !== null)) {
                updateStatus('Draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatus();
                // Computer's turn
                if (currentPlayer === 'O') {
                    setTimeout(computerMove, 500); // Delay computer's move for better UX
                }
            }
        }
    });
});

function computerMove() {
    if (difficulty === 'easy') {
        // Easy AI: choose a random empty cell
        const emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                emptyCells.push(i);
            }
        }
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        currentPlayer = 'X';
        updateStatus();
        if (checkWinner(board)) {
            updateStatus('O wins!');
        } else if (board.every(cell => cell !== null)) {
            updateStatus('Draw!');
        }
    } else {
        // Hard AI: block player's potential 3-in-a-row
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Check if the computer can win
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === 'O' && board[a] === board[b] && board[c] === null) {
                board[c] = 'O';
                cells[c].textContent = 'O';
                currentPlayer = 'X';
                updateStatus();
                if (checkWinner(board)) {
                    updateStatus('O wins!');
                } else if (board.every(cell => cell !== null)) {
                    updateStatus('Draw!');
                }
                return;
            } else if (board[a] === 'O' && board[a] === board[c] && board[b] === null) {
                board[b] = 'O';
                cells[b].textContent = 'O';
                currentPlayer = 'X';
                updateStatus();
                if (checkWinner(board)) {
                    updateStatus('O wins!');
                } else if (board.every(cell => cell !== null)) {
                    updateStatus('Draw!');
                }
                return;
            } else if (board[b] === 'O' && board[b] === board[c] && board[a] === null) {
                board[a] = 'O';
                cells[a].textContent = 'O';
                currentPlayer = 'X';
                updateStatus();
                if (checkWinner(board)) {
                    updateStatus('O wins!');
                } else if (board.every(cell => cell !== null)) {
                    updateStatus('Draw!');
                }
                return;
            }
        }

        // Block player's potential win
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === 'X' && board[a] === board[b] && board[c] === null) {
                board[c] = 'O';
                cells[c].textContent = 'O';
                currentPlayer = 'X';
                updateStatus();
                if (checkWinner(board)) {
                    updateStatus('O wins!');
                } else if (board.every(cell => cell !== null)) {
                    updateStatus('Draw!');
                }
                return;
            } else if (board[a] === 'X' && board[a] === board[c] && board[b] === null) {
                board[b] = 'O';
                cells[b].textContent = 'O';
                currentPlayer = 'X';
                updateStatus();
                if (checkWinner(board)) {
                    updateStatus('O wins!');
                } else if (board.every(cell => cell !== null)) {
                    updateStatus('Draw!');
                }
                return;
            } else if (board[b] === 'X' && board[b] === board[c] && board[a] === null) {
                board[a] = 'O';
                cells[a].textContent = 'O';
                currentPlayer = 'X';
                updateStatus();
                if (checkWinner(board)) {
                    updateStatus('O wins!');
                } else if (board.every(cell => cell !== null)) {
                    updateStatus('Draw!');
                }
                return;
            }
        }

        // If no win or block, choose the first empty cell
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                cells[i].textContent = 'O';
                currentPlayer = 'X';
                updateStatus();
                if (checkWinner(board)) {
                    updateStatus('O wins!');
                } else if (board.every(cell => cell !== null)) {
                    updateStatus('Draw!');
                }
                break;
            }
        }
    }
}

// Initialize the game status
updateStatus();

// Reset the board when the "Play Another Game" button is clicked
document.getElementById('tic-tac-toe-restart').addEventListener('click', () => {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    updateStatus();
});

// Handle level selection
document.getElementById('easy-level').addEventListener('click', () => {
    difficulty = 'easy';
    startGame();
});

document.getElementById('hard-level').addEventListener('click', () => {
    difficulty = 'hard';
    startGame();
});

function startGame() {
    document.getElementById('tic-tac-toe-levels').style.display = 'none';
    updateStatus();
}