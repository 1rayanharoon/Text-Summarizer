# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from config import Config
from routes import routes
from models import mongo
import nltk

nltk.download('punkt')
from nltk.tokenize import sent_tokenize

app = Flask(__name__)
app.config.from_object(Config)

# Initialize CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

mongo.init_app(app)
app.register_blueprint(routes, url_prefix='/api/users')

# Load summarization model
summarizer = pipeline("summarization", model="t5-small")

# Split text into chunks
def split_text(text, max_length=512):
    sentences = sent_tokenize(text)
    current_length = 0
    chunks = []
    current_chunk = []

    for sentence in sentences:
        current_length += len(sentence)
        if current_length <= max_length:
            current_chunk.append(sentence)
        else:
            chunks.append(' '.join(current_chunk))
            current_chunk = [sentence]
            current_length = len(sentence)
    
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks

# Summarize function
@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')
    format_type = data.get('format', 'paragraph')  # 'paragraph' or 'bullets'
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    chunks = split_text(text)
    summaries = []

    for chunk in chunks:
        summary = summarizer(chunk, max_length=150, min_length=30, do_sample=False)
        summaries.append(summary[0]['summary_text'])

    # Format summary
    if format_type == 'bullets':
        formatted_summary = '\n- '.join(summaries)
    else:
        formatted_summary = '\n\n'.join(summaries)

    return jsonify({'summary': formatted_summary})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
