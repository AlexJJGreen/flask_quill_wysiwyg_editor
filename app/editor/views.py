from flask import request, jsonify, render_template
from . import bp


@bp.route("/editor")
def editor():
    return render_template("editor.html")


@bp.route("/save_post", methods=["POST"])
def save_post():
    post_content = request.json.get("post_content", "")
    # Save post_content to a database or a file.
    return jsonify({"success": True})
