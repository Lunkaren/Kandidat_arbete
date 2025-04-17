import os
from flask import Flask, render_template, jsonify, send_from_directory, request, redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # Max 5MB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(120), nullable=False)

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), unique=True, nullable=False)
    upload_date = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Video {self.title}>'

    with app.app_context():
        db.create_all()
@app.route("/", methods=['GET'])
def index():
    image = Image.query.order_by(Image.id.desc()).first()
    return render_template("index.html", image=image)
@app.route("/videos")
def get_videos():
    videos = Video.query.all()
    video_list = [
        {
            "title": video.title,
            "file_path":f"/videos/{os.path.basename(video.file_path)}.mp4"

        }for video in videos
    ]
    return jsonify(video_list)
@app.route("/videos/<path:filename>")
def serve_video(filename):
    return send_from_directory("videos", filename)

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['image']
    if file:
        filename = secure_filename(file.filename)
        save_path = os.path.join('static/uploads', filename)
        file.save(save_path)

        new_image = Image(filename=filename)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({'image_url': f'/static/uploads/{filename}'})

    return jsonify({'error': 'No image recieved'}), 400


