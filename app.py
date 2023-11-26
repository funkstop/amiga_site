
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///guestbook.db'

db = SQLAlchemy(app)

class Guestbook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    message = db.Column(db.String(500))

@app.route('/')
def index():
    entries = Guestbook.query.all()
    return render_template('index.html', entries=entries)

@app.route('/test')
def test():
    entries = Guestbook.query.all()
    return render_template('test.html', entries=entries)


@app.route('/add_guestbook_entry', methods=['POST'])
def add_entry():
    name = request.form.get('name')
    message = request.form.get('message')

    entry = Guestbook(name=name, message=message)
    db.session.add(entry)
    db.session.commit()

    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)
