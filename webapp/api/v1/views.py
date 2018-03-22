# -*- coding: utf-8 -*-
from flask.ext.restful import reqparse
from flask_restful import Resource

from config import Config
from webapp import Wish
from webapp.api import errors
from webapp import User, db


class Wishes(Resource):
    def get(self, user_id):
        """ Get wishes for user id """
        user = User.query.filter_by(vk_id=user_id).first()
        if not user:
            user = User(vk_id=user_id)
            db.session.add(user)
            db.session.commit()

        return {
            "success": True,
            "message": errors.OK_MESSAGE,
            "result": [i.serialize for i in user.wishes]
        }, 200

    def post(self, user_id):
        """ Add new wish """
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('description', type=str)
        parser.add_argument('link', type=str)
        args = parser.parse_args()

        user = User.query.filter_by(vk_id=user_id).first()
        if not user:
            user = User(vk_id=args['user_id'])
            db.session.add(user)

        wish = Wish(text=args['name'],
                    description=args['description'],
                    link=args['link'])

        db.session.add(wish)
        user.wishes.append(wish)
        db.session.commit()
        return {
           "success": True,
           "message": errors.OK_MESSAGE,
        }, 200
