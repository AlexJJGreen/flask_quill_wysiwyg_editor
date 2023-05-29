from flask import request, jsonify, render_template
from app import db
from app.models import Content
from . import bp


@bp.route("/editor")
def editor():
    return render_template("editor.html", page_title="Content Editor")


@bp.route("/post_content", methods=["POST"])
def save_content():
    data = request.get_json()
    content_to_post = Content(
        title=data["title"],
        snippet=data["snippet"],
        thumbnail_url=data["thumbnailUrl"],
        content=data["content"],
    )

    db.session.add(content_to_post)
    db.session.commit()
    print(data["title"])
    return render_template("editor.html", page_title="Content Editor")
