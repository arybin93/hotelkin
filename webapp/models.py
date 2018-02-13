# -*- coding: utf-8 -*-
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from webapp import db


class Base(db.Model):
    """ Base model for other database tables to inherit """
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


class User(Base):
    vk_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.Unicode(55), nullable=True)

    wishes = relationship('Wish', back_populates='user')


class Wish(Base):
    """ Wishes model """
    __tablename__ = 'wish'

    text = db.Column(db.Unicode(128), nullable=False)
    description = db.Column(db.Unicode(255), nullable=True)
    link = db.Column(db.String(255), nullable=True)
    image = db.Column(db.Unicode(255), doc='Картинка')

    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    user = relationship('User', uselist=False, back_populates='wishes')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'description': self.description,
            'link': self.link,
            'vk_id': self.user.vk_id
        }
