from flask import render_template
from app.models import Content
from app import db
from . import bp


@bp.errorhandler(404)
def not_found_error(error):
    return render_template("404.html"), 404


@bp.route("/")
@bp.route("/index")
def index():
    content = Content.query.all()
    return render_template("index.html", content=content)


@bp.route("/content/<int:id>", methods=["GET", "POST"])
def content(id):
    post = db.session.query(Content).get(id)
    return render_template("content.html", post=post)
