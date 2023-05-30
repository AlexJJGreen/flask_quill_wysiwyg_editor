from flask import request, jsonify, render_template, redirect
from app import db
from app.models import Content
from . import bp


@bp.route("/editor")
def editor():
    return render_template("editor.html", page_title="Content Editor")


@bp.route("/edit_post", methods=["GET", "POST"])
def edit_post():
    id = request.args.get("id")
    post = db.session.query(Content).get(id)
    return render_template("editor.html", page_title="Edit Post", post=post)


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
    print(data)
    return redirect("editor.html", page_title="Content Editor")


## how to call save content based on URL ID
