from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import nltk
from nltk.tokenize import sent_tokenize

nltk.download('punkt')

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Load summarization model
summarizer = pipeline("summarization", model="t5-small")

# Load DistilBART model and tokenizer for paraphrasing
model_name = "sshleifer/distilbart-cnn-12-6"
tokenizer = AutoTokenizer.from_pretrained(model_name)
paraphrase_model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# Split text into chunks for summarization
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

# Paraphrasing function
@app.route('/api/paraphrase', methods=['POST'])
def paraphrase():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    input_text = f"paraphrase: {text}"
    encoding = tokenizer.encode_plus(input_text, return_tensors="pt", max_length=512, truncation=True)
    input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

    outputs = paraphrase_model.generate(
        input_ids=input_ids, 
        attention_mask=attention_mask,
        max_length=512,
        num_beams=5,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        early_stopping=True
    )

    paraphrased_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({'paraphrase': paraphrased_text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
