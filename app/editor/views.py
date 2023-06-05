from flask import request, jsonify, render_template, redirect, url_for
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


@bp.route("/get_post/<int:post_id>", methods=["GET"])
def get_post(post_id):
    post = db.session.query(Content).get_or_404(post_id)
    return jsonify({"content": post.content})


@bp.route("/delete_post", methods=["GET", "POST"])
def delete_post():
    if request.method == "POST":
        data = request.get_json()
        post = db.session.query(Content).get(data["id"])
        db.session.delete(post)
        db.session.commit()
        return jsonify({"redirect": url_for("main.index")})
    return render_template("editor.html")


@bp.route("/post_content", methods=["GET", "POST"])
def save_content():
    data = request.get_json()

    if "id" in data:
        post = db.session.query(Content).get(data["id"])
        post.title = data["title"]
        post.snippet = data["snippet"]
        post.thumbnail_url = data["thumbnailUrl"]
        post.content = data["content"]
    else:
        content_to_post = Content(
            title=data["title"],
            snippet=data["snippet"],
            thumbnail_url=data["thumbnailUrl"],
            content=data["content"],
        )
        db.session.add(content_to_post)

    db.session.commit()
    return jsonify(redirect(url_for("main.index")))
