# -*- coding: utf-8 -*-
from flask import Flask
from flask import render_template
from config import Config

app = Flask(__name__)
app.config.from_object('config.DevelopConfig')


@app.route('/')
def index():
    return render_template('main.html')


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=80)
