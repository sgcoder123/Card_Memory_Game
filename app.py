from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Route for the home page
@app.route('/')
def index():
    return render_template('home.html')

# Route for the card memory game start page
@app.route('/cardmemory')
def cardmemory():
    return render_template('cardmemory.html')

# Route for the Tic-Tac-Toe home page
@app.route('/tictactoehome')
def tictactoehome():
    return render_template('tictactoehome.html')

# Route for the Tic-Tac-Toe game page
@app.route('/tictactoe')
def tictactoe():
    level = request.args.get('level', 'easy')
    return render_template('tictactoe.html', level=level)

# Route to start the game, redirects to the play route with the selected level
@app.route('/start', methods=['POST'])
def start():
    game = request.form['game']
    level = request.form['level']
    if game == 'tictactoe':
        return redirect(url_for('tictactoe', level=level))
    return redirect(url_for('play', game=game, level=level))

# Route to display the game page for the selected game and level
@app.route('/play/<game>/<level>')
def play(game, level):
    return render_template(f'{game}_play.html', level=level)

# Main function to run the Flask app
if __name__ == '__main__': 
    app.run(debug=True)