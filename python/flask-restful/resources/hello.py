from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource


class Hello(Resource):
    @jwt_required
    def get(self):
        current_user = get_jwt_identity()
        return {"status": "success", "user_info": current_user}, 200

