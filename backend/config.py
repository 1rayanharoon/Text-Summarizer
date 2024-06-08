import os

class Config:
    SECRET_KEY = os.getenv('Rayan1234', 'Rayan1234')
    MONGO_URI = 'mongodb+srv://ibtsamsohail:mongo12345@cluster0.irr8qij.mongodb.net/semproj?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true'
