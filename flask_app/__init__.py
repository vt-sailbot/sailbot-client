from flask import Flask, render_template
from flask_socketio import SocketIO

from flask_app.routes import apply_routes

def create_app(test_config=None):

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret!'

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    apply_routes(app)

    return app

app = create_app()
socketio = SocketIO(app)
