from app import api
from resources.category import CategoryResource
from resources.comment import CommentResource
from resources.hello import Hello

api.add_resource(Hello, '/hello')
api.add_resource(CategoryResource, '/category')
api.add_resource(CommentResource, '/comment')