from flask import Flask
from flask import render_template
from flask_cors import CORS

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('main.html')


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=80)
