from flask import Blueprint, request, jsonify
from models import mongo, create_user, get_user_by_email, check_password
from utils import generate_token

routes = Blueprint('routes', __name__)

@routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    if password != confirm_password:
        return jsonify(message='Passwords do not match'), 400

    existing_user = get_user_by_email(email)
    if existing_user:
        return jsonify(message='User already exists'), 400

    user_id = create_user(username, email, password)
    token = generate_token(user_id)
    return jsonify(token=token, user={'id': str(user_id), 'username': username, 'email': email}), 201

@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = get_user_by_email(email)
    if not user or not check_password(user['password'], password):
        return jsonify(message='Invalid email or password'), 400

    token = generate_token(user['_id'])
    return jsonify(token=token, user={'id': str(user['_id']), 'username': user['username'], 'email': user['email']}), 200
