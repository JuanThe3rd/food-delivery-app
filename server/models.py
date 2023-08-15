from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    profile_pic = db.Column(db.String)

    def __repr__(self):
        return f'<User>'


class Login(db.Model, SerializerMixin):
    __tablename__ = 'logins'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    user_type = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    def __repr__(self):
        return f'<Login>'


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String)
    review_type = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    def __repr__(self):
        return f'<Review>'


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    owner = db.Column(db.String)

    def __repr__(self):
        return f'<Restaurant>'
