# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api
from .v1.views import *


def get_v1_resources():
    api_bp = Blueprint('api_v1', __name__, url_prefix='/api/v1')
    api = Api(api_bp)

    api.add_resource(WishesResources, '/user/<int:user_id>/wishes')
    api.add_resource(WishResources, '/user/<int:user_id>/wish/<int:wish_id>')
    return api
