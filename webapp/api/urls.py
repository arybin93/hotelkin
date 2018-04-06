# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api
from .v1.views import *


def get_v1_resources():
    api_bp = Blueprint('api_v1', __name__, url_prefix='/api/v1')
    api = Api(api_bp)

    api.add_resource(WishesListView, '/user/<int:user_id>/wishes')
    api.add_resource(WishView, '/user/<int:user_id>/wishes/<int:wish_id>')

    return api
