from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    profile_pic = db.Column(db.String)

    reviews = db.relationship('Review', cascade = 'all, delete', backref = 'user')
    logins = db.relationship('Login', cascade = 'all, delete', backref = 'user')

    serialize_rules = ('-reviews.user', '-logins.user')

    def __repr__(self):
        return f'<User name: {self.name} >'


class Login(db.Model, SerializerMixin):
    __tablename__ = 'logins'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    user_type = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    serialize_rules = ('-user.logins', '-restaurant.logins')

    def __repr__(self):
        return f'<Login username: {self.username}, User Type: {self.user_type} >'


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String)
    review_type = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    serialize_rules = ('-user.reviews', '-restaurant.reviews')

    def __repr__(self):
        return f'<Review review type: {self.review_type}, content: {self.content} >'


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    owner = db.Column(db.String)

    reviews = db.relationship('Review', cascade = 'all, delete', backref = 'restaurant')
    logins = db.relationship('Login', cascade = 'all, delete', backref = 'restaurant')

    serialize_rules = ('-reviews.restaurant', '-logins.restaurant')

    def __repr__(self):
        return f'<Restaurant name: {self.name}, owner: {self.owner} >'
