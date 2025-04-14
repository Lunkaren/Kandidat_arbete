from flask import Flask, render_template, jsonify, send_from_directory
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), unique=True, nullable=False)
    upload_date = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Video {self.title}>'

    with app.app_context():
        db.create_all()
@app.route("/")
def home():
    return render_template("base.html")
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

