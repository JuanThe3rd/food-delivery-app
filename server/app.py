#!/usr/bin/env python3

# Standard library imports

from flask import request, make_response
from flask_restful import Resource
from config import app, db, api
import os

from models import User, Login, Review, Restaurant, MenuItem

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


class Users(Resource):
    def get(self, id = None):
        if id:
            user = User.query.filter_by(id = id).first()

            if user:
                return make_response(user.to_dict(), 200)
            else:
                return make_response({'error': 'User not found'}, 404)
        else:
            users = User.query.all()
            return make_response([user.to_dict() for user in users], 200)
        
    def post(self):
        new_user = User(**request.json)
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(), 201)
    
    def patch(self, id):
        user = User.query.filter_by(id = id).first()

        if user:
            for key, value in request.json.items():
                setattr(user, key, value)
                db.session.commit()
                return make_response(user.to_dict(), 200)
        else:
            return make_response({'error': 'User not found'})
        
    def delete(self, id):
        user = User.query.filter_by(id = id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({'result': 'User deleted'}, 200)
        else:
            return make_response({'error': 'User not found'}, 404)


class Logins(Resource):
    def get(self, id = None):
        if id:
            login = Login.query.filter_by(id = id).first()

            if login:
                return make_response(login.to_dict(), 200)
            else:
                return make_response({'error', 'Login not found'}, 200)
        else:
            logins = Login.query.all()
            return make_response([login.to_dict() for login in logins], 200)
        
    def post(self):
        new_login = Login(**request.json)
        db.session.add(new_login)
        db.session.commit()
        return make_response(new_login.to_dict(), 201)
    
    def patch(self, id):
        login = Login.query.filter_by(id = id).first()

        if login:
            for key, value in request.json.items():
                setattr(login, key, value)
                db.session.commit()
                return make_response(login.to_dict(), 200)
        else:
            return make_response({'error': 'Login not found'})
        
    def delete(self, id):
        login = Login.query.filter_by(id = id).first()

        if login:
            db.session.delete(login)
            db.session.commit()
            return make_response({'result': 'Login deleted'}, 200)
        else:
            return make_response({'error': 'Login not found'}, 404)


class Reviews(Resource):
    def get(self, id = None):
        if id:
            review = Review.query.filter_by(id = id).first()

            if review:
                return make_response(review.to_dict(), 200)
            else:
                return make_response({'error', 'Review not found'}, 200)
        else:
            reviews = Review.query.all()
            return make_response([review.to_dict() for review in reviews], 200)
        
    def post(self):
        new_review = Review(**request.json)
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)
    
    def patch(self, id):
        review = Review.query.filter_by(id = id).first()

        if review:
            for key, value in request.json.items():
                setattr(review, key, value)
                db.session.commit()
                return make_response(review.to_dict(), 200)
        else:
            return make_response({'error': 'Review not found'})
        
    def delete(self, id):
        review = Review.query.filter_by(id = id).first()

        if review:
            db.session.delete(review)
            db.session.commit()
            return make_response({'result': 'Review deleted'}, 200)
        else:
            return make_response({'error': 'Review not found'}, 404)


class Restaurants(Resource):
    def get(self, id = None):
        if id:
            restaurant = Restaurant.query.filter_by(id = id).first()

            if restaurant:
                return make_response(restaurant.to_dict(), 200)
            else:
                return make_response({'error', 'Restaurant not found'}, 200)
        else:
            restaurants = Restaurant.query.all()
            return make_response([restaurant.to_dict() for restaurant in restaurants], 200)
        
    def post(self):
        new_restaurant = Restaurant(**request.json)
        db.session.add(new_restaurant)
        db.session.commit()
        return make_response(new_restaurant.to_dict(), 201)
    
    def patch(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()

        if restaurant:
            for key, value in request.json.items():
                setattr(restaurant, key, value)
                db.session.commit()
                return make_response(restaurant.to_dict(), 200)
        else:
            return make_response({'error': 'Restaurant not found'})
        
    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()

        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            return make_response({'result': 'Restaurant deleted'}, 200)
        else:
            return make_response({'error': 'Restaurant not found'}, 404)


class MenuItems(Resource):
    def get(self, id = None):
        if id:
            menuItem = MenuItem.query.filter_by(id = id).first()

            if menuItem:
                return make_response(menuItem.to_dict(), 200)
            else:
                return make_response('Error, item not found', 404)
        else:
            menuItems = MenuItem.query.all()
            return make_response([menuItem.to_dict() for menuItem in menuItems], 200)


api.add_resource(Users, '/users', '/users/<int:id>')
api.add_resource(Logins, '/logins', '/logins/<int:id>')
api.add_resource(Reviews, '/reviews', '/reviews/<int:id>')
api.add_resource(Restaurants, '/restaurants', '/restaurants/<int:id>')
api.add_resource(MenuItems, '/menuItems', '/menuItems/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

