# -*- coding: utf-8 -*-
from flask import Flask
from flask import render_template
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config.DevelopConfig')

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from webapp.models import User, Wish


@app.route('/')
def index():
    return render_template('main.html')
