from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', cascade = 'all, delete', backref = 'user')
    logins = db.relationship('Login', cascade = 'all, delete', backref = 'user')
    past_orders = db.relationship('PastOrder', cascade = 'all, delete', backref = 'user')

    serialize_rules = ('-reviews.user', '-logins.user', '-past_orders.user')

    def __repr__(self):
        return f'<User name: {self.name} >'
    
    @validates('name', 'profile_pic')
    def validates_login(self, key, value):
        if key == 'name':
            if len(value) < 2:
                raise ValueError('Name must be at least 2 characters long')
        elif key == 'profile_pic':
            if len(value) < 10 or value[0:4] != 'http':
                raise ValueError('Profile_pic must be an image URL address')


class PastOrder(db.Model, SerializerMixin):
    __tablename__ = 'past_orders'

    id = db.Column(db.Integer, primary_key = True)
    total = db.Column(db.Integer)
    menuItemIDs = db.Column(db.String)
    quantities = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    serialize_rules = ('-user.past_orders', '-restaurant.past_orders')

    def __repr__(self):
        return f'<PastOrder >'


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    owner = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', cascade = 'all, delete', backref = 'restaurant')
    logins = db.relationship('Login', cascade = 'all, delete', backref = 'restaurant')
    menuitems = db.relationship('MenuItem', cascade = 'all, delete', backref = 'restaurant')
    past_orders = db.relationship('PastOrder', cascade = 'all, delete', backref = 'restaurant')

    serialize_rules = ('-reviews.restaurant', '-logins.restaurant', '-menuitems.restaurant', '-past_orders.restaurant')

    def __repr__(self):
        return f'<Restaurant name: {self.name}, owner: {self.owner} >'


class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menuitems'

    id = db.Column(db.Integer, primary_key = True)
    item = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Integer)
    food_type = db.Column(db.String)
    quantity = db.Column(db.Integer)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    serialize_rules = ('-restaurant.menuitems',)

    def __repr__(self):
        return f'<MenuItem {self.item} from {self.restaurant.name} >'


class Login(db.Model, SerializerMixin):
    __tablename__ = 'logins'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    user_type = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    serialize_rules = ('-user.logins', '-restaurant.logins')

    def __repr__(self):
        return f'<Login username: {self.username}, User Type: {self.user_type} >'


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String, nullable=False)
    review_type = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    serialize_rules = ('-user.reviews', '-restaurant.reviews')

    def __repr__(self):
        return f'<Review review type: {self.review_type}, content: {self.content} >'
