from flask import request, jsonify, render_template
from app import db
from . import bp


@bp.route("/editor")
def editor():
    return render_template("editor.html", page_title="Content Editor")


@bp.route("/post_content", methods=["POST"])
def save_content():
    data = request.get_json()
    # Save post_content to a database or a file.
    # content = Content(content=form.)
    print(data)
    return jsonify({"data": data}), 200
