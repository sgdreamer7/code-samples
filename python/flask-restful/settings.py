import os

basedir = os.path.abspath(os.path.dirname(__file__))

DB_NAME = os.environ.get('POSTGRES_DB', 'flask_restful')
DB_USER = os.environ.get('POSTGRES_USER', 'api_user')
DB_PASSWORD = os.environ.get('POSTGRES_PASSWORD', 'incode2015')
DB_HOST = os.environ.get('POSTGRES_HOST', 'db')
DB_PORT = os.environ.get('POSTGRES_PORT', 5432)

SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "postgresql://{}:{}@{}/{}".format(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME)