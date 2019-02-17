from flask import request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, \
    get_jwt_identity, jwt_refresh_token_required
from flask_restful import Resource
from models import User, UserSchema

user_schema = UserSchema()


class LoginResource(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        if not json_data:
            return jsonify({"msg": "Missing JSON in request"}), 400

        data, errors = user_schema.load(json_data)
        if errors:
            return errors, 422

        user = User.authenticate(email=data['email'], password=data['password'])
        if user:
            access_token = create_access_token(identity=data['email'])
            refresh_token = create_refresh_token(identity=data['email'])
            return {"status": "success", "access_token": access_token,
                    "refresh_token": refresh_token}, 201
        else:
            return {"status": "error",
                    "info": "email or password are incorrect"}, 401


class RefreshResource(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        return {'access_token': create_access_token(identity=current_user)}, 200
