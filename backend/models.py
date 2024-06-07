from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

mongo = PyMongo()
bcrypt = Bcrypt()

def get_user_by_email(email):
    return mongo.db.users.find_one({"email": email})

def create_user(username, email, password):
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_id = mongo.db.users.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password
    }).inserted_id
    return user_id

def check_password(hashed_password, password):
    return bcrypt.check_password_hash(hashed_password, password)
