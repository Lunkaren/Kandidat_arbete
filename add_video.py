from main import app, db, Video

def add_video(title, file_path):
    with app.app_context():
        video = Video(title=title, file_path=file_path)
        db.session.add(video)
        db.session.commit()
        print(f"Video '{title}' has been added to the database.")