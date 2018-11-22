from flask import Blueprint
from flask_restful import Api

from resources.category import CategoryResource
from resources.comment import CommentResource
from resources.hello import Hello

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Hello, '/hello')
api.add_resource(CategoryResource, '/category')
api.add_resource(CommentResource, '/comment')