# Mini Game Hub

Welcome to the Mini Game Hub! This project is a collection of mini-games implemented using Flask for the backend and HTML, CSS, and JavaScript for the frontend. The games included are:

- Number Guessing Game
- Tic-Tac-Toe
- Card Memory Game

## Project Structure

### .vscode/launch.json

This file contains the configuration for debugging the Flask application using Visual Studio Code.

### app.py

This is the main Flask application file. It defines the routes for the home page, each game's home page, and the game play pages. It also handles the form submissions to start the games.

### static/css/

This directory contains the CSS files for styling the different pages and games.

- **home.css**: Styles for the home page.
- **numberguess.css**: Styles for the Number Guessing Game.
- **styles.css**: Common styles used across different games.
- **tictactoe.css**: Styles for the Tic-Tac-Toe game.

### static/js/

This directory contains the JavaScript files for the game logic.

- **numberguess.js**: Contains the logic for the Number Guessing Game.
- **scripts.js**: Contains the logic for the Card Memory Game.
- **tictactoe.js**: Contains the logic for the Tic-Tac-Toe game.

### templates/

This directory contains the HTML templates for the different pages.

- **cardmemory_play.html**: Template for the Card Memory Game play page.
- **cardmemory.html**: Template for the Card Memory Game home page.
- **home.html**: Template for the home page.
- **numberguess.html**: Template for the Number Guessing Game play page.
- **numberguesshome.html**: Template for the Number Guessing Game home page.
- **tictactoe.html**: Template for the Tic-Tac-Toe game play page.
- **tictactoehome.html**: Template for the Tic-Tac-Toe game home page.

## How to Run

1. Clone the repository.
2. Install the required dependencies using `pip install -r requirements.txt`.
3. Run the Flask application using `python app.py`.
4. Open your browser and navigate to `http://127.0.0.1:5000/` to access the Mini Game Hub.

## Game Descriptions

### Number Guessing Game

In this game, the player has to guess a randomly generated number within a specified range. The player can select the difficulty level (easy, medium, hard), which determines the range of numbers.

### Tic-Tac-Toe

This is a classic Tic-Tac-Toe game where the player can play against the computer. The player can select the difficulty level (easy, hard), which determines the computer's strategy.

### Card Memory Game

In this game, the player has to match pairs of cards by flipping them over. The player can select the difficulty level (easy, medium, hard, god), which determines the number of cards.