from flask import Flask
from app import api_bp
from models import db
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)

def create_app(settings_filename):
    app.config.from_object(settings_filename)
    jwt = JWTManager(app)

    app.register_blueprint(api_bp, url_prefix='/api')
    db.init_app(app)

    return app


if __name__ == "__main__":
    app = create_app("settings")
    app.run(debug=True, host='0.0.0.0', port=8000)
