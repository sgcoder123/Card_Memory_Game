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

# Route to start the game, redirects to the play route with the selected level
@app.route('/start', methods=['POST'])
def start():
    level = request.form['level']
    return redirect(url_for('play', level=level))

# Route to display the game page for the selected level
@app.route('/play/<level>')
def play(level):
    return render_template('play.html', level=level)

# Main function to run the Flask app
if __name__ == '__main__':
    app.run(debug=True)