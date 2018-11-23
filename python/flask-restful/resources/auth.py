from flask import request
from flask_restful import Resource
from models import UserSchema, User, db

user_schema = UserSchema()


class AuthResource(Resource):

    def post(self):
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400

        data, errors = user_schema.load(json_data)
        if errors:
            return errors, 422
        user = User.query.filter_by(email=data['email']).first()
        if user:
            return {'message': 'User with this email already exists'}, 400
        user = User(
            email=json_data['email'], password=json_data['password']
        )

        db.session.add(user)
        db.session.commit()

        return {"status": 'success', 'data': "Successfully"}, 201
