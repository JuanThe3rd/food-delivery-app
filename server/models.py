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

    serialize_rules = ('-reviews.user', '-logins.user')

    def __repr__(self):
        return f'<User name: {self.name} >'
    
    @validates('name', 'profile_pic')
    def validates_login(self, key, name, profile_pic):
        if key == 'name':
            if len(name) < 2:
                raise ValueError('Name must be at least 2 characters long')
        elif key == 'profile_pic':
            if len(profile_pic) < 10 or profile_pic[0:4] != 'http':
                raise ValueError('Profile_pic must be an image URL address')


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    owner = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', cascade = 'all, delete', backref = 'restaurant')
    logins = db.relationship('Login', cascade = 'all, delete', backref = 'restaurant')
    menuitems = db.relationship('MenuItem', cascade = 'all, delete', backref = 'restaurant')

    serialize_rules = ('-reviews.restaurant', '-logins.restaurant', '-menuitems.restaurant')

    def __repr__(self):
        return f'<Restaurant name: {self.name}, owner: {self.owner} >'
    
    @validates('name', 'image', 'owner')
    def validates_login(self, key, name, image, owner):
        if key == 'name':
            if len(name) < 2:
                raise ValueError('Name must be at least 2 characters long')
        elif key == 'image':
            if len(image) < 10:
                raise ValueError('Image must be an image URL address')
        elif key == 'owner':
            if len(owner) == 0:
                raise ValueError('Owner name must be more than 0 characters')


class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menuitems'

    id = db.Column(db.Integer, primary_key = True)
    item = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Integer)
    food_type = db.Column(db.String)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    serialize_rules = ('-restaurant.menuitems',)

    def __repr__(self):
        return f'<MenuItem {self.item} from {self.restaurant.name} >'
    
    @validates('item', 'image', 'price', 'food_type')
    def validates_menuItem(self, key, item, image, price, food_type):
        if key in 'item':
            if len(item) == 0:
                raise ValueError('Item name must be at least 1 character long.')
        elif key == 'image':
            if len(image) < 10:
                raise ValueError('Image must be an image URL address')
        elif key == 'price':
            if price < 0:
                raise ValueError('Price must be a positive integer')
        elif key == 'food_type':
            if food_type not in ['entree', 'side', 'beverage']:
                raise ValueError("Food type must either be 'entree', 'side', or 'beverage'")


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
    
    @validates('username', 'password')
    def validates_login(self, key, username, password):
        if key == 'username':
            if len(username) < 5:
                raise ValueError('Username must be at least 5 characters long')
        elif key == 'password':
            if len(password) < 5:
                raise ValueError('Password must be at least 5 characters long')


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
