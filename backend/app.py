from flask import Flask
from flask_cors import CORS
from config import Config
from routes import routes
from models import mongo

app = Flask(__name__)
app.config.from_object(Config)

# Initialize CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

mongo.init_app(app)
app.register_blueprint(routes, url_prefix='/api/users')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
