# -*- coding: utf-8 -*-
from flask_restful import Resource

from config import Config
from webapp.api import errors
from webapp import User


class Wishes(Resource):
    def get(self, user_id):
        """ Get wishes for user id """
        user = User.query.filter_by(vk_id=user_id).first()
        return {
            "success": True,
            "message": errors.OK_MESSAGE,
            "result": [i.serialize for i in user.wishes]
        }, 200
