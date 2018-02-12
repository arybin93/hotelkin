# -*- coding: utf-8 -*-
import os
import os.path as op

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# create directory for hold image
FILE_PATH = op.join(op.dirname(__file__), 'uploads')
IMAGE_PATH = op.join(FILE_PATH, 'image')

try:
    os.mkdir(FILE_PATH)
except OSError:
    pass


class Config(object):
    DEBUG = True
    CSRF_ENABLED = True

    SQLALCHEMY_DATABASE_URI = 'mysql://root:root@localhost:3306/my_gifts'
    DATABASE_CONNECT_OPTIONS = {'encoding': 'utf8'}
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # administator list
    ADMINS = []
    FEEDBACK_EMAILS = []


class ProductionConfig(Config):
    DEBUG = False


class DevelopConfig(Config):
    DEBUG = True
    MAIL_DEBUG = True
